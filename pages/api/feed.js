import connectDB from 'backend/db';
import User from 'backend/models/User';
import Feed from 'backend/models/Feed';
import useAuth from 'backend/useAuth';
import basicAuth from 'basic-auth';
import RSS from 'rss';

const FOOTER_TEXT =
  '\n\nPlease update to v2 of UnofficialRSS before July 15, 2021 to make sure your feeds keep working. <a href="https://v2.unofficialrss.com">UnofficialRSS v2</a>';

export default async (req, res) => {
  await connectDB();
  let user;
  const credentials = basicAuth(req);
  if (credentials) {
    user = await User.findOne({
      privateID: credentials.name,
      privateKey: credentials.pass
    });
  } else user = await useAuth(req);
  if (!user) {
    res
      .status(401)
      .setHeader('WWW-Authenticate', 'Basic realm="Unofficial RSS"');
    return res.json({ error: 'Incorrect or missing credentials.' });
  }
  const active = await user.verifyStitcherPremiumSubscription();
  if (!active) return res.status(403).json({ error: 'Expired subscription.' });

  const { feedID } = req.query;
  if (!feedID) return res.status(401).json({ error: 'Invalid feed.' });

  const feed = await Feed.findOne({ stitcherID: feedID });
  if (!feed) return res.status(404).json({ error: 'Feed not found.' });
  const { episodes, lastModified } = await feed.getEpisodes(user);

  const rss = new RSS({
    title: feed.title,
    description: `${feed.description}${FOOTER_TEXT}`,
    image_url: feed.imageURL,
    feed_url: `https://unofficialrss.com/feed/${feed.stitcherID}`,
    site_url: `https://unofficialrss.com`,
    generator: 'Unofficial RSS',
    language: 'en',
    author: 'Stitcher Premium',
    copyright: 'Stitcher Premium',
    ttl: '60',
    pubDate: new Date(lastModified),
    custom_namespaces: {
      itunes: 'http://www.itunes.com/dtds/podcast-1.0.dtd',
      googleplay: 'http://www.google.com/schemas/play-podcasts/1.0'
    },
    custom_elements: [
      { 'itunes:author': 'Stitcher Premium' },
      {
        'itunes:summary': feed.description
      },
      { 'itunes:block': 'yes' },
      { 'googleplay:block': 'yes' },
      {
        'itunes:owner': [
          { 'itunes:name': 'Unofficial RSS' },
          { 'itunes:email': 'help@unofficialrss.com' }
        ]
      },
      {
        'itunes:image': {
          _attr: {
            href: feed.imageURL
          }
        }
      }
    ]
  });
  for (const episode of episodes) {
    const episodeURL = `http${
      process.env.NODE_ENV == 'production' ? 's' : ''
    }://${process.env.NEXT_PUBLIC_DOMAIN}/feed/${feed.stitcherID}/${
      user.privateID
    }/${user.privateKey}/${episode.stitcherID}.mp3`;
    rss.item({
      title: episode.title,
      description: `${episode.description}${FOOTER_TEXT}`,
      date: episode.published,
      guid: `Unofficial-RSS-${episode.stitcherID}`,
      url: episodeURL,
      enclosure: {
        url: episodeURL,
        type: 'audio/mpeg',
        size: 1
      },
      custom_elements: [{ 'itunes:duration': episode.duration }]
    });
  }
  const xml = rss.xml();
  res.setHeader('Content-Type', 'text/xml; charset=UTF-8');
  res.setHeader('Last-Modified', new Date(lastModified).toISOString());
  return res.send(xml);
};
