export const initialState = {
  token: "",
  refresh: "",
  loggedIn: false,
};
export const AuthReducer = (state, action) => {
  switch (action.type) {
    case "init_stored": {
      return action.value;
    }

    case "set_token": {
      return {
        ...state,
        token: action.value,
      };
    }
    case "set_refresh": {
      return {
        ...state,
        refresh: action.value,
      };
    }
    case "set_loggedIn": {
      return {
        ...state,
        loggedIn: action.value,
      };
    }
    case "logout": {
      return {
        ...state,
        token: null,
        refresh: null,
        loggedIn: false,
      };
    }
    default:
      return state;
  }
};
