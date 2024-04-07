import { FC, ReactNode, createContext, useEffect, useReducer } from "react";
import axios from "@/axios.config";
import { API_ENDPOINTS } from "@/lib/Json";
import { User } from "@/lib/interfaces/common.interface";

// @type
type Props = {
  children: ReactNode;
};
// @enum
enum ACTION_TYPES {
  LOGOUT = "LOGOUT",
  SETUSER = "SETUSER",
}
// @interfaces
// type of context for user
export interface UserType {
  authState: AuthState;
  authDispatch: React.Dispatch<Actions>;
  getUser: (token: string) => void;
  logoutUser: () => void;
}
// reducer actions
interface Actions {
  type: ACTION_TYPES;
  payload: any;
}
// reducer state
interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
}

// @reducer function
const AuthReducer = (state: AuthState, action: Actions) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION_TYPES.SETUSER:
      return {
        ...state,
        isLoggedIn: true,
        user: payload,
      };
    case ACTION_TYPES.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: payload,
      };
    default:
      return state;
  }
};
const initalState: AuthState = {
  user: null,
  isLoggedIn: false,
};
// @create contexts
export const UserAuth = createContext<UserType>({
  authState: initalState,
  authDispatch: () => null,
  getUser: () => null,
  logoutUser: () => null,
});
// @context component
const AuthContext: FC<Props> = ({ children }) => {
  const [authState, authDispatch] = useReducer(AuthReducer, initalState);
  // @logoutUser() - logs the user out
  const logoutUser = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    authDispatch({ type: ACTION_TYPES.LOGOUT, payload: null });
  };

  function getUser(token: string) {
    axios
      .get(API_ENDPOINTS.AUTH, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const { status, error: err, data } = res.data;
        switch (status) {
          case "error":
            console.error(err);
            return;
          case "ok":
            authDispatch({
              type: ACTION_TYPES.SETUSER,
              payload: data,
            });
            return;
        }
      })
      .catch((err) => {
        console.error(err.response.data.error);
      });
  }

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) getUser(token);
  }, []);

  return (
    <UserAuth.Provider
      value={{
        authState,
        authDispatch,
        getUser,
        logoutUser,
      }}
    >
      {children}
    </UserAuth.Provider>
  );
};

export default AuthContext;
