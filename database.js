var mysql = require('mysql2'); 
const { Sequelize } = require("sequelize");
const dotenv = require('dotenv');
dotenv.config();

console.log(process.env.DATABASE, process.env.USER);


// Create the database
var con = mysql.createConnection({ 
  host: process.env.HOST, 
  user: process.env.USER, 
  password: process.env.PASSWORD, 
  database: process.env.DATABASE, 
  multipleStatements: true 
}); 
 
con.connect(function(err) { 
  if (err) throw err; 
  console.log("Connected!"); 
}); 
 

// Connect to the database with sequelise
const sequelize = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
host: process.env.HOST,
dialect: "mysql" // Choose your database dialect
});



// Sync sequelise to database
(async () => {
  try {
    await sequelize.authenticate(); // test the connection
    console.log("Connection established!");

    await sequelize.sync(); // creates the table if it doesn’t exist
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = {con, sequelize};