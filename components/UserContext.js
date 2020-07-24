import React, { useState, useEffect } from 'react';
import { getInfo } from 'utils/api';
import { useRouter } from 'next/router';
import Router from 'next/router';

export const UserContext = React.createContext();

export const UserContextProvider = ({ children }) => {
  const [initialized, setInitialized] = useState(false);
  const [user, setUser] = useState();
  const { route } = useRouter();
  useEffect(() => {
    getInfo().then(({ user }) => {
      setUser(user);
      setInitialized(true);
    });
  }, []);
  useEffect(() => {
    if (!initialized) return;
    if (!user && (route == '/feeds' || route == '/search')) Router.push('/');
  }, [initialized, user, route]);
  return (
    <UserContext.Provider value={{ initialized, user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
