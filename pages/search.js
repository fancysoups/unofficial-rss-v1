import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import FeedsList from 'components/FeedsList';
import SearchBar from 'components/SearchBar';
import { getSearch } from 'utils/api';
import Head from 'next/head';

const Search = () => {
  const {
    query: { term = '' },
  } = useRouter();
  const [loading, setLoading] = useState(true);
  const [feeds, setFeeds] = useState([]);
  useEffect(() => {
    document.getElementById('search').focus();
    if (term && term.length) {
      setLoading(true);
      setFeeds([]);
      getSearch(term).then(({ feeds }) => {
        setFeeds(feeds);
        setLoading(false);
      });
    }
  }, [term]);
  return (
    <>
      <Head>
        <title>Search | UNOFFICIAL RSS</title>
      </Head>
      <SearchBar initialTerm={term} />
      <FeedsList loading={loading} feeds={feeds} />
    </>
  );
};

export default Search;
