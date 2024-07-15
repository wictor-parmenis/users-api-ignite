require('dotenv').config();

export default {
  jwt: {
    secret: `${process.env.JWT_SECRET}` as string,
    expiresIn: '24h',
    expiresInRefreshToken: '7d',
    secretRefreshToken: `${process.env.JWT_SECRET_REFRESH_TOKEN}` as string,
  },
};
