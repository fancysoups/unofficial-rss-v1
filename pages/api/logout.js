const cookieEtc =
  process.env.NODE_ENV == 'production'
    ? `Domain=${process.env.NEXT_PUBLIC_DOMAIN}; Secure;`
    : '';

export default async (req, res) => {
  res.setHeader(
    'Set-Cookie',
    `token=; Max-Age=; Path=/; HttpOnly;${cookieEtc}`
  );
  return res.json({ success: true });
};
