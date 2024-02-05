const countService = require('./tryToCount/count.service')
const express = require('express');
const router = express.Router();
const clientService = require('./client.srevice')

// צד השרת
router.get('/:qr', async (req, res) => {
    try {
        const code = await clientService.qrSend();
        res.send(code);
    } catch (error) {
        console.error("Error generating QR code:", error);
        res.status(500).send("Internal Server Error");
    }
});



module.exports = { router }