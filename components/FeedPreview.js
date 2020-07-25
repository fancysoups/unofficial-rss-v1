import React, { useContext } from 'react';
import { UserContext } from './UserContext';
import CopyToClipboardButton from './CopyToClipboardButton';

const FeedPreview = ({ feed }) => {
  const { user } = useContext(UserContext);
  const feedURL = `http${process.env.NODE_ENV == 'production' ? 's' : ''}://${
    user?.privateID
  }:${user?.privateKey}@${process.env.NEXT_PUBLIC_DOMAIN}/feed/${
    feed.stitcherID
  }`;
  return (
    <div className="feed-preview">
      <img
        className="art"
        src={feed.imageURL}
        width="100"
        height="100"
        loading="lazy"
      />
      <div className="meta">
        <div className="text">
          <div className="title">{feed.title}</div>
          <div className="description">{feed.description}</div>
        </div>
        <input
          className="feed-url"
          value={user ? feedURL : 'You must be logged in to view.'}
          readOnly
        />
        <div className="controls">
          <CopyToClipboardButton text={feedURL} />
        </div>
      </div>
      <style jsx>{`
        .feed-preview {
          margin: 20px 0;
          background: rgba(0, 0, 0, 0.4);
          border-radius: 5px;
          overflow: hidden;
          display: grid;
          grid-template-columns: 150px 1fr;
          box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
        }
        .feed-preview:first-of-type {
          margin-top: 0;
        }
        .art {
          min-width: 0;
          display: block;
          width: 100%;
          height: auto;
          background: rgba(0, 0, 0, 0.05);
        }
        .meta {
          padding: 10px 20px;
          display: grid;
          grid-template-rows: 1fr auto auto;
        }
        .feed-url {
          width: 100%;
          display: block;
          padding: 10px;
          background: rgba(255, 255, 255, 0.075);
          color: white;
          font-size: 12px;
          margin-bottom: 10px;
          border: none;
          border-radius: 3px;
          outline: none;
          font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo,
            Courier, monospace;
        }
        .feed-url:focus {
          background: rgba(255, 255, 255, 0.2);
        }
        .title {
          font-size: 14px;
          font-weight: 600;
          margin-bottom: 5px;
        }
        .description {
          color: #ccc;
          font-size: 12px;
          line-height: 1.3em;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        @media (max-width: 768px) {
          .feed-preview {
            align-items: center;
          }
          .title {
            font-size: 14px;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .meta {
            padding: 5px 10px;
            display: block;
          }
          .feed-url {
            font-size: 10px;
            padding: 5px;
            margin-bottom: 5px;
          }
          .description {
            display: none;
          }
          @media (max-width: 768px) {
            .feed-preview {
              margin: 10px 0;
              grid-template-columns: 100px 1fr;
            }
          }
        }
      `}</style>
    </div>
  );
};

export default FeedPreview;
