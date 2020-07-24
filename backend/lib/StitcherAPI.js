import * as StitcherEncrypt from './StitcherEncrypt';
import { parseStringPromise } from 'xml2js';

const API_URL = 'https://stitcher.com/Service/';
const DEVICE_ID = 'abcde';

export const get = async (url, skipParams = false) => {
  const fullURL =
    API_URL +
    url +
    (!skipParams
      ? (url.split('?').length > 0 ? '&' : '?') +
        `udid=${DEVICE_ID}&version=8.9&mode=iPhoneApp`
      : '');
  const response = await fetch(fullURL, {
    headers: {
      accept: 'application/json',
    },
  });
  const text = await response.text();
  return await parseStringPromise(text);
};

export const getUserInfo = async (email, password) => {
  const epx = StitcherEncrypt.encrypt(DEVICE_ID, password);
  return await get(
    `CheckAuthentication.php?email=${encodeURIComponent(email)}&epx=${epx}`
  );
};

export const searchPremiumFeeds = async ({ term, userID }) => {
  const response = await get(
    `Search.php?term=${encodeURIComponent(
      term
    )}&uid=${userID}&c=10&searchType=feed&src=keyword&from=site&topHitsBy=relevance&mode=website`,
    true
  );
  if (!response.search.feed) return [];
  const feeds = response.search.feed
    .map(item => item['$'])
    .filter(item => item.premium == '1')
    .map(item => ({
      stitcherID: item.id,
      title: item.name,
      description: item.feedDescription,
      imageURL: item.imageURL,
    }));
  return feeds;
};

export const getFeedDetails = async ({ feedID, user }) => {
  let c = 250;
  let s = 0;
  let episodes = [],
    latestPage;
  let episodeCount;
  do {
    const response = await get(
      `GetFeedDetailsWithEpisodes.php?&fid=${feedID}&season_Id=-1&s=${s}&c=${c}&uid=${user.stitcherID}`
    );
    episodeCount = parseInt(response.feed_details.feed[0]['$'].episodeCount);
    latestPage = response.feed_details.episodes?.[0].episode.map(ep => ({
      title: ep.title?.[0],
      description: ep.description?.[0],
      originalDescription: ep.originalDescription?.[0],
      ...ep['$'],
    }));
    episodes = episodes.concat(latestPage);
    s += c;
  } while (s < episodeCount);
  return episodes;
};

export const getSubscriptionStatus = async ({ userID }) => {
  const response = await get(`GetSubscriptionStatus.php?uid=${userID}`, true);
  return response.subscriptionStatus['$'];
};
