import React, { useState, useEffect } from 'react';
import Router from 'next/router';
import { getColorForStringColor } from 'utils/colors';
import useDebounce from 'utils/use-debounce';

const SearchBar = ({ initialTerm = '' }) => {
  const [term, setTerm] = useState(initialTerm);
  const onSearchSubmit = async e => {
    e.preventDefault();
    if (term.length) Router.push(`/search?term=${term}`);
    else Router.push('/feeds');
  };
  const debouncedTerm = useDebounce(term, 500);
  useEffect(() => {
    if (term.length) Router.push(`/search?term=${debouncedTerm}`);
    else Router.push('/feeds');
  }, [debouncedTerm]);
  return (
    <form className="search" onSubmit={onSearchSubmit}>
      <input
        id="search"
        type="text"
        placeholder="Search for a podcast..."
        value={term}
        onChange={e => setTerm(e.target.value)}
      />
      <style jsx>{`
        form {
          position: sticky;
          top: 0px;
          margin: 0 -20px;
          margin-top: -40px;
          margin-bottom: 40px;
          padding: 20px 20px;
          display: grid;
          grid-template-columns: 1fr auto;
        }
        input {
          width: 100%;
          padding: 10px 15px;
          outline: none;
          border-radius: 100px;
          border: 1px solid hsl(236, 6%, 30%);
          background: hsla(243, 22%, 12%, 97%);
          color: hsl(242, 3%, 55%);
          font-size: 14px;
          box-shadow: 0px 0px 10px 35px hsla(243, 22%, 12%, 100%);
          backdrop-filter: blur(3px);
          text-align: center;
        }
        input:focus {
          border: 1px solid ${getColorForStringColor('blue2')};
          color: white;
          background: hsla(243, 22%, 12%, 97%);
        }
        button {
          padding: 5px;
        }
        @media (max-width: 768px) {
          form {
            padding: 10px 20px;
            margin-top: 0px;
            margin-bottom: 20px;
            background: hsla(243, 22%, 12%, 97%);
            backdrop-filter: blur(5px);
          }
          input {
            font-size: 16px;
            box-shadow: none;
            background: transparent;
          }
        }
      `}</style>
    </form>
  );
};

export default SearchBar;
