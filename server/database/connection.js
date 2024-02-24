const mysql = require("mysql2");

class Connection {
  constructor(config) {
    this._con = this.createDBConnection(config);
  }

  createDBConnection = (config) => {
    if (!config) throw "Database Connection failed";
    return mysql.createPool(config);
  };

  getConnection = () => {
    return this._con.promise();
  };
}
module.exports = Connection;
