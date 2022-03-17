import React, { useContext, useEffect, useState } from "react";
import API from "../API";
import { useMemesContext } from "./memes_context";

const UserContext = React.createContext();
export const UserProvider = ({ children }) => {
  const [myUser, setMyUser] = useState(null);
  const [isAuthenticated, setIsAutenticated] = useState(false);
  const { setDirty } = useMemesContext();
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // here you have the user info, if already logged in
        const user = await API.getUserInfo();
        setMyUser(user);
        setIsAutenticated(true);
      } catch (err) {}
    };
    checkAuth();
  }, []);

  const handleLogin = async (credentials) => {
    API.logIn(credentials)
      .then((user) => {
        setMyUser(user);
        setIsAutenticated(true);
        setDirty();
      })
      .catch((error) => {});
  };

  const handleLogout = async () => {
    API.logOut();
    // clean up everything
    setMyUser(null);
    setIsAutenticated(false);
    setDirty();
  };

  return (
    <UserContext.Provider
      value={{ handleLogin, handleLogout, myUser, isAuthenticated }}
    >
      {children}
    </UserContext.Provider>
  );
};
// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};
