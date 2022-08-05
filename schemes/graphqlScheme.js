import { gql } from 'graphql-tag'

import { LocalScheme } from '~auth/runtime'

const LOGIN_MUTATION = gql`
  mutation LoginMutation($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      success
      errors
      obtainPayload {
        token
        refreshToken
        refreshExpiresIn
        payload {
          exp
          origIat
          username
        }
      }
    }
  }
`

// export const LOGOUT_MUTATION = gql`
//   mutation LogOutMutation {
//     logOut
//   }
// `

export const USER_DETAILS_QUERY = gql`
  query UserDetailsQuery {
    me {
      username
      verified
    }
  }
`

export default class GraphQLScheme extends LocalScheme {
  async login(credentials, { reset = true } = {}) {
    const {
      apolloProvider: { defaultClient: apolloClient },
      $apolloHelpers,
    } = this.$auth.ctx.app

    // Ditch any leftover local tokens before attempting to log in
    if (reset) {
      this.$auth.reset({ resetInterceptor: false })
    }
    // Make login request
    const response = await apolloClient.mutate({
      mutation: LOGIN_MUTATION,
      variables: credentials,
    })

    console.log('a')
    this.token = response.data.tokenAuth.obtainPayload.token
    console.log('b')
    // Set your graphql-token
    await $apolloHelpers.onLogin(response.data.tokenAuth.obtainPayload.token)
    console.log('c')

    // Fetch user
    await this.fetchUser()
    console.log('d')

    // Update tokens
    return response.data.tokenAuth.obtainPayload.token
  }

  fetchUser() {
    const {
      apolloProvider: { defaultClient: apolloClient },
    } = this.$auth.ctx.app

    console.log(1)
    // Token is required but not available
    if (!this.check().valid) {
      return
    }
    console.log(2)

    // Try to fetch user
    return apolloClient
      .query({
        query: USER_DETAILS_QUERY,
      })
      .then(({ data }) => {
        if (!data.me) {
          const error = new Error(`User Data response not resolved`)
          return Promise.reject(error)
        }

        this.$auth.setUser(data.me)

        return data.me
      })
      .catch((error) => {
        this.$auth.callOnError(error, { method: 'fetchUser' })
        return Promise.reject(error)
      })
  }

  async logout() {
    const {
      apolloProvider: { defaultClient: apolloClient },
      $apolloHelpers,
    } = this.$auth.ctx.app

    // await apolloClient
    //   .mutate({
    //     mutation: LOGOUT_MUTATION,
    //   })
    //   .catch(() => {
    //     // Handle errors
    //   })

    // But reset regardless
    $apolloHelpers.onLogout()
    return this.$auth.reset({ resetInterceptor: false })
  }

  initializeRequestInterceptor() {
    // Instead of initializing axios interceptors, Do nothing
    // Since we are not using axios
  }

  reset() {
    this.$auth.setUser(false)
    this.$auth.strategy.token.set(false)
  }
}
