import gql from "graphql-tag";

export const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
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
`;

export const LOGOUT_MUTATION = gql`
  mutation logout($refreshToken: String!) {
    revokeToken(refreshToken: $refreshToken) {
      errors
      success
      revokePayload {
        revoked
      }
    }
  }
`;

export const ME_QUERY = gql`
  query user {
    me {
      username
      status {
        archived
        verified
        secondaryEmail
      }
      isStaff
      isActive
      isSuperuser
      archived
      verified
      id
      email
      lastName
      firstName
      dateJoined
      lastLogin
    }
  }
`;
