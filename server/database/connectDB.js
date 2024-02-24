const Connection = require("./connection");

let DBConnection = null;
const connectDB = () => {
  const config = {
    host: process.env.SQL_HOST,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    database: process.env.SQL_DATABASE,
  };
  DBConnection = new Connection(config).getConnection();
};

module.exports = {
  DBConnection,
  connectDB,
};
