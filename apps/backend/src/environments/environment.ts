export const environment = {
  production: false,
  dbHost: process.env.DB_HOST,
  dbPort: 5432,
  dbUsername: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,
  mailgunHost: process.env.MAILGUN_HOST,
  mailgunKey: process.env.MAILGUN_KEY,
  mailgunUser: process.env.MAILGUN_USER,
};
