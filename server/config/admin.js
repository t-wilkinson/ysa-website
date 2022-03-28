module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '494baefa903028daa178e292db08e15b'),
  },
});
