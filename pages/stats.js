import React from 'react';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

import connectDB from 'backend/db';
import User from 'backend/models/User';
import Feed from 'backend/models/Feed';
import Head from 'next/head';
export const getStaticProps = async () => {
  await connectDB();
  const users = await User.countDocuments();
  const activeUsers = await User.countDocuments({
    expiration: { $gt: new Date() },
  });
  const feeds = await Feed.countDocuments();
  return {
    props: { users, activeUsers, feeds, lastUpdated: Date.now() },
    unstable_revalidate: 60 * 60,
  };
};

const Stats = ({ users, activeUsers, feeds, lastUpdated }) => {
  const { isFallback } = useRouter();
  return (
    <div className="stats">
      <Head>
        <title>Stats | UNOFFICIAL RSS</title>
      </Head>
      <div className="stat">
        <div className="name">Feeds</div>
        <div className="value">
          {isFallback ? '...' : feeds.toLocaleString()}
        </div>
      </div>
      <div className="stat">
        <div className="name">Active Users</div>
        <div className="value">
          {isFallback ? '...' : activeUsers.toLocaleString()}
        </div>
      </div>
      <div className="stat">
        <div className="name">Total Users</div>
        <div className="value">
          {isFallback ? '...' : users.toLocaleString()}
        </div>
      </div>
      <div className="last-updated">
        This data was last updated {dayjs(new Date(lastUpdated)).fromNow()}.
      </div>
      <style jsx>{`
        .stats {
          margin-top: 20px;
        }
        .stat {
          display: flex;
          justify-content: space-between;
          padding: 15px 20px;
          background: rgba(0, 0, 0, 0.4);
          border-radius: 5px;
          margin: 10px 0;
        }
        .last-updated {
          margin-top: 20px;
          text-align: center;
          color: #999;
          font-size: 12px;
        }
      `}</style>
    </div>
  );
};

export default Stats;
