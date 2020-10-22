import React, { useContext } from 'react';
import UserData from 'components/UserData';
import { UserContext } from 'components/UserContext';
import Head from 'next/head';

const About = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="about">
      <Head>
        <title>About Unofficial RSS</title>
      </Head>
      <div className="title">About Unofficial RSS</div>
      <p>
        Unofficial RSS is a tool that creates personal RSS feeds for subscribers
        of premium podcasts. These RSS feeds can be used in almost any podcast
        app, just like any other podcast.
      </p>
      <p>It currently supports Stitcher Premium podcasts.</p>
      <p>
        The service stores zero personal data or login information.{' '}
        {user && (
          <>
            Since you're logged in, you can view the entirety of your user data
            below.
          </>
        )}
      </p>
      {user && <UserData />}
      <p>
        Unofficial RSS is maintained by the creators of Podbay, an independent
        podcast company working to make the digital spaces around podcasts more
        exciting, open, and sustainable over the next decade.
      </p>
      <p>
        If you appreciate the service provided here, please take a few minutes
        to preview out our new web product at{' '}
        <a href="https://podbay.fm" target="_blank">
          Podbay.fm
        </a>
        . It's lightning-fast, uncluttered, and intuitive, and never requires a
        login. We also have mobile apps launching later this year, and a variety
        of experimental new features and demos launching soon.
      </p>
      <p>
        Special thanks to John Long, the creator of the original Unofficial RSS
        Feeds for Stitcher project. You can find him at{' '}
        <a href="https://128.io" target="_blank">
          128.io
        </a>
        , and view his original project's source{' '}
        <a href="https://gitlab.com/stitcher-rss/stitcher-rss" target="_blank">
          here
        </a>
        .
      </p>
      <p>
        There are no ads or trackers on this site. Our stats page is generated
        using counts from our database.
      </p>
      <style jsx>{`
        .title {
          color: hsl(199, 82%, 67%);
          font-weight: 600;
          font-size: 20px;
          margin-top: 25px;
          margin-bottom: 10px;
        }
        p {
          line-height: 1.5em;
          margin-bottom: 1.5em;
        }
        a {
          color: hsl(199, 72%, 67%);
        }
      `}</style>
    </div>
  );
};

export default About;
