import connectDB from 'backend/db';
import useAuth from 'backend/useAuth';
import Feed from 'backend/models/Feed';

export default async (req, res) => {
  await connectDB();
  const user = await useAuth(req);
  if (!user) return res.json({ error: 'Must be logged in to access feeds.' });
  const feeds = await Feed.find().sort({ lastModified: -1 }).lean();
  return res.json({ feeds });
};
