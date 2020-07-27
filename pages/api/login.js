import connectDB from 'backend/db';
import User from 'backend/models/User';
import { getUserInfo } from 'backend/lib/StitcherAPI';

const cookieEtc =
  process.env.NODE_ENV == 'production'
    ? `Domain=${process.env.NEXT_PUBLIC_DOMAIN}; Secure;`
    : '';

export default async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.json({ error: 'Email and password are both required.' });
  try {
    const stitcherUser = (await getUserInfo(email, password)).user['$'];
    if (stitcherUser.error) throw stitcherUser.error;
    else if (stitcherUser.subscriptionState == '3') {
      await connectDB();
      const user = await User.findOneAndUpdate(
        { stitcherID: stitcherUser.id },
        {
          expiration: new Date(stitcherUser.subscriptionExpiration + '-08:00'),
          updatedAt: new Date(),
        },
        { upsert: true, new: true }
      );
      if (!user.privateID || !user.privateKey)
        await user.generatePrivateLogin();
      const token = await user.generateToken();
      res.setHeader(
        'Set-Cookie',
        `token=${token}; Max-Age=${60 * 60 * 24}; Path=/; HttpOnly;${cookieEtc}`
      );
      return res.json({ user });
    } else
      return res.json({
        error:
          "Looks like you're not a Stitcher Premium subscriber. You can subscribe at https://www.stitcher.com/premium",
      });
  } catch (err) {
    console.log(err);
    switch (err) {
      case 'userNotFound':
        return res.json({
          error: 'Invalid login. Please double check your email and password.',
        });
      default:
        return res.json({
          error: 'Something went wrong communicating with Stitcher.',
        });
    }
  }
};
