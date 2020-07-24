import User from './models/User';

export default async req => {
  if (req.headers?.authorization || req.cookies.token) {
    try {
      const token =
        req.cookies?.token ||
        req.headers?.authorization?.replace('Bearer ', '');

      req.user = await User.verifyToken(token);
      return req.user;
    } catch (e) {
      return null;
    }
  }
  return null;
};
