import {
  useEffect,
  useReducer,
  createContext,
  useContext,
  useMemo,
} from "react";
import { AuthReducer, initialState } from "./AuthReducer";

const AuthContext = createContext();

export function AuthWrapper({ children }) {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("state"))) {
      //checking if there already is a state in localstorage
      //if yes, update the current state with the stored one
      dispatch({
        type: "init_stored",
        value: JSON.parse(localStorage.getItem("state")),
      });
    }
  }, []);

  useEffect(() => {
    if (state !== initialState) {
      localStorage.setItem("state", JSON.stringify(state));

      //create and/or set a new localstorage variable called "state"
    }
  }, [state]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
export function useAuthContext() {
  return useContext(AuthContext);
}
