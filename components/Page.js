import React, { useContext } from 'react';
import Link from 'next/link';
import { UserContext } from './UserContext';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Page = ({ children }) => {
  const { user } = useContext(UserContext);
  const { route } = useRouter();

  return (
    <div className="page">
      <Head>
        <title>Unofficial RSS</title>
        <link rel="icon" type="image/png" href="/icon.png" />
        <meta
          name="description"
          content="A simple, free, and open source tool that lets paying subscribers
            access their podcasts in their favorite apps."
        />
      </Head>
      <div className="sidebar">
        <div className="sidebar-main">
          <Link href={user ? '/feeds' : '/'}>
            <a>
              <img
                className="logo"
                src="/corner.png"
                alt="Unofficial RSS"
                width="230"
                height="70"
              />
            </a>
          </Link>
          <div className="subtitle">
            A simple, free, and open source tool that lets paying subscribers
            access their podcasts in their favorite apps.
          </div>
          <div className="links">
            {user && (
              <Link href="/feeds">
                <a className="nav-link">Feeds</a>
              </Link>
            )}
            <Link href="/about">
              <a className="nav-link">About</a>
            </Link>
            <Link href="/stats">
              <a className="nav-link">Stats</a>
            </Link>
            <a
              className="nav-link"
              href="https://github.com/fancysoups/unofficial-rss"
              target="_blank"
            >
              Source
            </a>
            {user && (
              <Link href="/logout">
                <a className="nav-link">Log out</a>
              </Link>
            )}
          </div>
        </div>
        {user && route == '/feeds' && (
          <div className="credentials">
            If you're asked for login information when adding a feed, use your
            randomly generated credentials listed here.
            <div className="cred">Username: {user.privateID}</div>
            <div className="cred">Password: {user.privateKey}</div>
          </div>
        )}
      </div>
      <div className="children">{children}</div>
      <style jsx>{`
        .page {
        }
        .sidebar {
          position: fixed;
          max-width: 300px;
          left: 20px;
          top: 40px;
          z-index: 1;
        }
        .sidebar-main {
          padding: 20px;
          border-radius: 10px;
          background: rgba(0, 0, 0, 0.4);
        }
        .logo {
          margin-top: -45px;
          max-width: 230px;
          height: auto;
          display: block;
          margin-bottom: 10px;
          transition: 5s filter ease-in-out;
          filter: hue-rotate(0deg);
        }
        .credentials {
          padding: 20px;
          border-radius: 10px;
          background: hsl(197, 38%, 36%);
          font-size: 12px;
          margin-top: 20px;
          line-height: 1.4em;
        }
        .cred {
          font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo,
            Courier, monospace;
          padding: 5px 10px;
          border-radius: 5px;
          margin-top: 5px;
          background: rgba(255, 255, 255, 0.1);
        }
        .logo:hover {
          filter: hue-rotate(360deg);
        }
        .subtitle {
          font-size: 14px;
          line-height: 1.4em;
          color: #ddd;
        }
        .links {
          margin: 0 auto;
          margin-top: 15px;
          padding: 0 10px;
          display: flex;
          justify-content: space-around;
        }
        .nav-link {
          color: #ddd;
          font-weight: 500;
          font-size: 12px;
          text-decoration: none;
        }
        .nav-link:hover {
          text-decoration: underline;
        }

        .children {
          padding: 20px;
          max-width: 600px;
          margin: 0 auto;
          position: relative;
          z-index: 100;
        }
        @media (max-width: 768px) {
          .sidebar {
            position: relative;
            top: 40px;
            left: 0;
            max-width: 600px;
            margin: 0 10px;
            margin-bottom: 50px;
          }
          .children {
            padding: 10px;
          }
        }
      `}</style>
      <style jsx global>{`
        @import url('https://rsms.me/inter/inter.css');

        * {
          box-sizing: border-box;
        }
        html,
        body {
          background: hsl(238, 26%, 12%);
          color: white;
          margin: 0;
          padding: 0;
        }
        html,
        body,
        input,
        button {
          font-family: 'Inter', sans-serif;
        }
        body {
          overscroll-behavior-y: none;
        }
      `}</style>
    </div>
  );
};

export default Page;
