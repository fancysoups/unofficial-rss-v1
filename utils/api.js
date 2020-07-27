const API_URL = `${process.env.NEXT_PUBLIC_PROTOCOL || 'https:'}//${
  process.env.NEXT_PUBLIC_DOMAIN
}/api`;

export const get = async url => {
  const response = await fetch(API_URL + url);
  return await response.json();
};

export const post = async (url, data) => {
  const response = await fetch(API_URL + url, {
    body: JSON.stringify(data),
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return await response.json();
};

export const postLogin = data => post('/login', data);
export const getInfo = () => get('/info');
export const getFeeds = () => get('/feeds');
export const getSearch = term => get(`/search?term=${term}`);
export const postLogout = () => get('/logout');
