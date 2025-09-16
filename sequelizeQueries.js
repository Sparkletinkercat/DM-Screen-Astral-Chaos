const mysql = require('mysql2');


// Retrieve Object Relational Mapping
try {
    var {sequelize} = require("./database.js");
    var {Campaign, seqModels} = require("./sequelizeModels.js");
} catch (error) { console.log(error); }




// Return all table data
async function getTableData (tableName) { 
  try {
    await sequelize.authenticate(); // ensure connection works
    await sequelize.sync(); // ensure table exists

    const campaigns = await eval(seqModels[tableName]).findAll();
    //console.log(campaigns.map(c => c.toJSON()));

    return campaigns;
  } catch (err) {
    console.error("Error fetching table data:", err);
    return [];
  }
};


// Insert data to a table
async function insertDataToTable (tableName, data) {
  try {
    await sequelize.authenticate(); // ensure connection works
    await sequelize.sync(); // ensure table exists

    const newData = await eval(seqModels[tableName]).create(data);

  } catch (err) {
    console.error("Error inserting table data:", err);
  }
};


// Delete entry from a table
async function deleteEntryByID (tableName, entry) {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    const deleteEntry = await eval(seqModels[tableName]).destroy({where: { id: entry}});
  } catch (err) {
    console.error("Error deleting an entry by id:", err);
  }
}

module.exports = {getTableData, insertDataToTable, deleteEntryByID};