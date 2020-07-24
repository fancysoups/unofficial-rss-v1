import connectDB from 'backend/db';
import useAuth from 'backend/useAuth';
import Feed from 'backend/models/Feed';
import { searchPremiumFeeds } from 'backend/lib/StitcherAPI';

export default async (req, res) => {
  await connectDB();
  const user = await useAuth(req);
  if (!user) return res.json({ error: 'Must be logged in to search feeds.' });
  const { term } = req.query;
  try {
    const stitcherFeeds = await searchPremiumFeeds({
      term,
      userID: user.stitcherID,
    });
    for (const feed of stitcherFeeds) {
      await Feed.findOneAndUpdate(
        { stitcherID: feed.stitcherID },
        { ...feed },
        { upsert: true }
      );
    }
    return res.json({ feeds: stitcherFeeds });
  } catch (err) {
    console.log(err);
    return res.json({ error: 'Something went wrong.' });
  }
};
