import gql from 'graphql-tag'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'octoinui',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '~/plugins/persistedState.client.js' }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/buefy
    'nuxt-buefy',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',

    // '@nuxtjs/auth-next',
    '@nuxtjs/apollo',
  ],

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  // auth: {
  //   strategies: {
  //     graphql: {
  //       scheme: '~/schemes/graphqlScheme.js',
  //     },
  //   },
  //   // redirect: {
  //   //   login: '/login',
  //   //   logout: '/login?logout=true',
  //   //   callback: false,
  //   //   home: '/dashboard',
  //   // },
  // },
  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: 'http://localhost:8000/graphql', // My graphql endpiont
      },
    },
  },
  // qAuth: {
  //   strategies: {
  //     local: {
  //       endpoints: {
  //         login: {
  //           mutation: gql`
  //             mutation login($username: String!, $password: String!) {
  //               tokenAuth(username: $username, password: $password) {
  //                 success
  //                 errors
  //                 obtainPayload {
  //                   token
  //                   refreshToken
  //                   refreshExpiresIn
  //                   payload {
  //                     exp
  //                     origIat
  //                     username
  //                   }
  //                 }
  //               }
  //             }
  //           `,
  //         },
  //         logout: {
  //           mutation: gql`
  //             mutation logout($refreshToken: String!) {
  //               revokeToken(refreshToken: $refreshToken) {
  //                 errors
  //                 success
  //                 revokePayload {
  //                   revoked
  //                 }
  //               }
  //             }
  //           `,
  //         },
  //         user: {
  //           query: gql`
  //             query user {
  //               me {
  //                 username
  //                 status {
  //                   archived
  //                   verified
  //                   secondaryEmail
  //                 }
  //                 isStaff
  //                 isActive
  //                 isSuperuser
  //                 archived
  //                 verified
  //                 id
  //                 email
  //                 lastName
  //                 firstName
  //                 dateJoined
  //                 lastLogin
  //               }
  //             }
  //           `,
  //         },
  //       },
  //       user: {
  //         property: 'user',
  //       },
  //       token: {
  //         property: 'tokenAuth.obtainPayload.token',
  //       },
  //     },
  //   },
  //   redirect: false,
  // },
  // router: {
  //   middleware: ['qAuth'],
  // },
}
