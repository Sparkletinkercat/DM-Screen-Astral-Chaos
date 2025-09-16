const express = require('express');
const path = require('path');
const router = express.Router();
const { getTableData} = require("./sequelizeQueries.js")

router.use(express.static('public'));
router.use(express.static(path.join(__dirname, 'public')));


router.get('/', async (req, res) => {
    try {
        const campaigns = await getTableData("Campaign"); // directly await

        res.render('index', { 
        title: "Astral Chaos's Online DM Screen", 
        campaigns: campaigns 
        });

        //console.log('Campaigns:', campaigns); // Check the value of campaigns
        
    } catch (error) {
        console.error('Error fetching campaigns:', error);
        res.status(500).send('Internal Server Error');
    }
});



router.get('/Campaign/:name', async (req, res) => {
    const campaignId = req.query.campaignId;
    const campaignName = req.params.name;

    try {
        const players = await getTableData("Players");
        const characters = await getTableData("Characters");
        res.render(path.join(__dirname, 'views', 'campaignMain.ejs'), 
        { 
            campaignId: campaignId, 
            campaignName: campaignName,
            players: players,
            characters: characters
        });

    } catch (error) {
        console.error('Error fetching stuff:', error);
        res.status(500).send('Internal Server Error');
    }
    
});



module.exports = router;