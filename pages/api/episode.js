import connectDB from 'backend/db';
import User from 'backend/models/User';
import Feed from 'backend/models/Feed';
import Episode from 'backend/models/Episode';

export default async (req, res) => {
  await connectDB();
  let user;
  const { feedID, privateID, privateKey, episodeID } = req.query;
  if (!feedID || !privateID || !privateKey || !episodeID) {
    return res.status(403).json({ error: 'Invalid request.' });
  }

  user = await User.findOne({ privateID, privateKey });
  if (!user) return res.status(403).json({ error: 'Invalid login.' });

  const active = await user.verifyStitcherPremiumSubscription();
  if (!active) return res.status(403).json({ error: 'Expired subscription.' });

  const episode = await Episode.findOne({ stitcherID: episodeID }).lean();
  if (!episode) return res.status(404).json({ error: 'Episode not found.' });
  res.status(302).setHeader('Location', episode.url);
  return res.send('');
};
