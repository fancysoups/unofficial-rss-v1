import React, { useEffect, useContext } from 'react';
import LoginForm from 'components/LoginForm';
import Router from 'next/router';
import { UserContext } from 'components/UserContext';

const Index = () => {
  const { initialized, user } = useContext(UserContext);
  useEffect(() => {
    if (initialized && user) Router.replace('/feeds');
  }, [initialized, user]);
  return initialized && !user && <LoginForm />;
};

export default Index;
