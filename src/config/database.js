import 'dotenv/config';

module.exports = {
  dialect: process.ENV.DATABASE_DIALECT,
  host: process.ENV.DATABASE_HOST,
  username: process.ENV.DATABASE_USERNAME,
  password: process.ENV.DATABASE_PASSWORD,
  database: process.ENV.DATABASE_DATABASE,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
