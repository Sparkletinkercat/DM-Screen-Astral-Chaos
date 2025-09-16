const express = require('express');
const path = require('path');
const router = express.Router();
const {insertDataToTable, deleteEntryByID} = require("./sequelizeQueries.js");
const { con } = require('./database.js');

// Get routes for css and js
router.use(express.static('public'));
router.use(express.static(path.join(__dirname, '/public/')));

// Route to handle form submission for adding a new campaign
router.post('/addCampaign', async (req, res) => {
    const data = {name: req.body.campaignName}
    try {
        await insertDataToTable("Campaign", data);
        res.redirect('/');
    } catch (error) {
        console.error('Error adding campaign:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.post('/addPlayer', async (req, res) => {
    const data = {
        name: req.body.playerName,
        pronouns: req.body.pronouns,
        triggers: req.body.triggers,
        notes: req.body.notes
    }

    const campaignId = req.body.campaignId;
    const campaignName = req.body.campaignName;
    try {
        await insertDataToTable("Players", data);
        res.redirect("/Campaign/" + campaignName + "?campaignId=" + campaignId);
    } catch (error) {
        console.error('Error adding player:', error);
        res.status(500).send('Internal Server Error');
    }
});


function parseNumber(value) {
  const n = parseInt(value);
  return isNaN(n) ? null : n;
}

router.post('/addCharacter', async (req, res) => {

    const data = {
        character_name: req.body.character_name,
        senses: req.body.senses,
        armor_class: parseNumber(req.body.armor_class),
        passive_stealth: parseNumber(req.body.passive_stealth),
        passive_perception: parseNumber(req.body.passive_perception),
        passive_investigation: parseNumber(req.body.passive_investigation),
        inititive: parseNumber(req.body.inititive),
        background_feature: req.body.background_notes,
        background_notes: req.body.background_feature,
        notes: req.body.notes,
        player_id: req.body.player_id
    }
    
    const campaignId = req.body.campaignId;
    const campaignName = req.body.campaignName;


    try {
        await insertDataToTable("Characters", data);
        res.redirect("/Campaign/" + campaignName + "?campaignId=" + campaignId);
    } catch (error) {
        console.error('Error adding character:', error);
        res.status(500).send('Internal Server Error');
    }
});
  

router.post('/Campaign/:name', (req, res) => {
    const campaignId = req.body.campaignId;
    const campaignName = req.body.campaignName || req.params.name;

    // Redirect to the GET route with query parameters
    res.redirect(`/Campaign/${campaignName}?campaignId=${campaignId}`);
});

// Route to handle deleting an entry from a table
router.post('/deleteTable/:id', async (req, res) => {
    const urlPath = req.body.url;

    const id = req.params.id;
    const tableName = req.body.tableName;


    try {
        await deleteEntryByID(tableName, parseNumber(id));
        res.redirect(urlPath);
    } catch (error) {
        console.error('Error deleting entry from ' + tableName + ' with an id of ' + id, error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;