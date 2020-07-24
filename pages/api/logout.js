const cookieEtc =
  process.env.NODE_ENV == 'production'
    ? `Domain=unofficialrss.com; Secure;`
    : '';

export default async (req, res) => {
  res.setHeader(
    'Set-Cookie',
    `token=; Max-Age=; Path=/; HttpOnly;${cookieEtc}`
  );
  return res.json({ success: true });
};
