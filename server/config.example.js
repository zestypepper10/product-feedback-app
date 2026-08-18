// Copy this file's shape into your own .env — this file itself holds no secrets.
const config = {
  databaseUrl: process.env.DATABASE_URL,
  frontendOrigins: (process.env.FRONTEND_ORIGIN || "http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim()),
};

export default config;
