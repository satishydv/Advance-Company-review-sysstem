const mongoose = require('mongoose');
const dotenv = require('dotenv');

// to handle uncaught exceptions like console.log(x) x is not defined
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: './config.env' });
// env variables set

const app = require('./app');
const DB = process.env.DB_URL.replace(
  '<PASSWORD>',process.env.DB_URL
);

mongoose.connect(DB).then(() => console.log('DB connection successful!'))
.catch(err => console.log('DB connection error:', err));

const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});