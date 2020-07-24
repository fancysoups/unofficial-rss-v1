import connectDB from 'backend/db';
import useAuth from 'backend/useAuth';

export default async (req, res) => {
  await connectDB();
  const user = await useAuth(req);
  if (!user) return res.json({ user: null });
  const active = await user.verifyStitcherPremiumSubscription();
  if (!active) return res.json({ user: null });
  else return res.json({ user });
};
