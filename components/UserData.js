import React, { useContext } from 'react';
import { UserContext } from 'components/UserContext';

const UserData = () => {
  const { user } = useContext(UserContext);
  return (
    <pre>
      {JSON.stringify(user, null, 4)}
      <style jsx>{`
        pre {
          margin: 20px 0;
          background: rgba(0, 0, 0, 0.4);
          border-radius: 10px;
          padding: 20px;
          font-size: 12px;
        }
      `}</style>
    </pre>
  );
};

export default UserData;
