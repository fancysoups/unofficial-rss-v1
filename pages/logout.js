import React, { useEffect, useContext } from 'react';
import Router from 'next/router';
import { postLogout } from 'utils/api';
import { UserContext } from 'components/UserContext';

const Logout = () => {
  const { setUser } = useContext(UserContext);
  useEffect(() => {
    setUser();
    postLogout().then(() => {
      Router.push('/');
    });
  }, []);
  return null;
};

export default Logout;
