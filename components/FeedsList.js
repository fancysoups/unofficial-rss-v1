import React from 'react';
import FeedPreview from './FeedPreview';
import Loader from './Loader';

const FeedsList = ({ loading, feeds }) => {
  return (
    <div className="feeds-list">
      {loading ? (
        <div className="loader">
          <Loader />
        </div>
      ) : feeds.length > 0 ? (
        feeds.map(feed => <FeedPreview key={feed.stitcherID} feed={feed} />)
      ) : (
        <div className="empty">
          <div className="message">No podcasts found.</div>
        </div>
      )}
      <style jsx>{`
        .loader {
          height: 300px;
          display: grid;
          place-items: center;
        }
        .empty {
          margin-top: 40px;
          width: 100%;
          padding: 11% 0;
          text-align: center;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 5px;
          color: #ddd;
          font-size: 14px;
          font-weight: 500;
        }
      `}</style>
    </div>
  );
};

export default FeedsList;
