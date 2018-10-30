const mysql = require('mysql');

class DB {
  constructor(config) { 
  	config.database.insecureAuth = false;
    this.connection = mysql.createPool(config.database);
    return this.connection;
  }
}

module.exports = DB;
