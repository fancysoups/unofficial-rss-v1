import React, { useState, useEffect } from 'react';
import { getFeeds } from 'utils/api';
import FeedsList from 'components/FeedsList';
import SearchBar from 'components/SearchBar';
import Head from 'next/head';

const Shows = () => {
  const [loading, setLoading] = useState(true);
  const [feeds, setFeeds] = useState([]);
  useEffect(() => {
    getFeeds().then(({ feeds }) => {
      if (feeds) setFeeds(feeds);
      setLoading(false);
    });
  }, []);
  return (
    <>
      <Head>
        <title>Feeds | Unofficial RSS</title>
      </Head>
      <SearchBar />
      <FeedsList loading={loading} feeds={feeds} />
    </>
  );
};

export default Shows;
