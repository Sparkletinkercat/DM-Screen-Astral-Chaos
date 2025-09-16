const { Sequelize } = require("sequelize");
const { sequelize } = require("./database.js");

const Campaign = sequelize.define("Campaign", {
  id: { 
    type: Sequelize.INTEGER, 
    allowNull: false, 
    primaryKey: true, 
    autoIncrement: true 
  },
  name: { 
    type: Sequelize.STRING,   
    allowNull: false 
  }
}, {
  tableName: "campaign", // exact table name in MySQL
  timestamps: false      // disable createdAt/updatedAt if not present
});


const Campaign_Settings = sequelize.define("Campaign_Settings", {
  id: { 
    type: Sequelize.INTEGER, 
    allowNull: false, 
    primaryKey: true, 
    autoIncrement: true 
  },
  campaign_id: { 
    type: Sequelize.INTEGER,   
    allowNull: false 
  }
}, {
  tableName: "campaign_settings", // exact table name in MySQL
  timestamps: false      // disable createdAt/updatedAt if not present
});


const Players = sequelize.define("Players", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  pronouns: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  triggers: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  notes: {
    type: Sequelize.TEXT,
    allowNull: true
  }
}, {
  tableName: "player",   // matches your MySQL table exactly
  timestamps: false      // disable createdAt/updatedAt since table has none
});


const Characters = sequelize.define("Characters", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  character_name: {
    type: Sequelize.STRING(255),
    allowNull: true
  },
  senses: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  armor_class: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  passive_stealth: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  passive_perception: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  passive_investigation: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  inititive: {    // note: maybe you meant "initiative"
    type: Sequelize.INTEGER,
    allowNull: true
  },
  background_feature: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  background_notes: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  notes: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  player_id: {
    type: Sequelize.INTEGER,
    allowNull: true,
    references: {
      model: Players,
      key: "id"
    },
    onDelete: "CASCADE"
  }
}, {
  tableName: "character", // match your MySQL table exactly
  timestamps: false
});



//convert to object map for better access
const seqModels = {Campaign, Campaign_Settings, Players, Characters};

module.exports = {seqModels};
