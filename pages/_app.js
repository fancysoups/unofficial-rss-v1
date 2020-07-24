import { useEffect } from 'react';
import Page from 'components/Page';
import { UserContextProvider } from 'components/UserContext';

const App = ({ Component, pageProps }) => {
  useEffect(() => {
    if (process.env.NODE_ENV == 'production' && location.protocol !== 'https:')
      location.replace(
        `https:${location.href.substring(location.protocol.length)}`
      );
  }, []);
  return (
    <UserContextProvider>
      <Page>
        <Component key {...pageProps} />
      </Page>
    </UserContextProvider>
  );
};

export default App;
