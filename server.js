const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();

// Set the port (use environment variable or default to 3000)
const PORT = process.env.PORT || 4000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Minecraft Server Details
const MINECRAFT_IP = 'morgmc.ddns.net';
const MINECRAFT_PORT = '40457';

// API Endpoint to fetch Minecraft server status
app.get('/api/status', async (req, res) => {
    try {
        // Fetch data from public Minecraft API
        const response = await axios.get(`https://api.mcsrvstat.us/2/${MINECRAFT_IP}:${MINECRAFT_PORT}`);
        
        // Structure the data we need
        const statusData = {
            online: response.data.online,
            players: {
                online: response.data.players ? response.data.players.online : 0,
                max: response.data.players ? response.data.players.max : 0,
                list: response.data.players ? response.data.players.list : []
            }
        };
        
        res.json(statusData);
    } catch (error) {
        console.error('Error fetching Minecraft status:', error);
        res.status(500).json({ online: false, error: 'Failed to fetch server status' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`-----------------------------------`);
    console.log(`Morg MC Website is running smoothly!`);
    console.log(`Local: http://localhost:${PORT}`);
    console.log(`-----------------------------------`);
});