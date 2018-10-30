const mysql = require('mysql');

class DB {
  constructor(config) {
    this.connection = mysql.createPool(config.database);
    return this.connection;
  }
}

module.exports = DB;
