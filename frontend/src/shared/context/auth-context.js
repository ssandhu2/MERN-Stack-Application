import { createContext } from "react";

//allows us to pass data between any component in our application we have to wrap it like we do in app.js
export const AuthContext = createContext({
  isLoggedIn: false,
  login: () => {},
  logout: () => {}
});
