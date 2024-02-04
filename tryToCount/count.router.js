const express = require('express');
const router = express.Router();
const countService = require('./count.service');
const db = require('./db')

router.get('/', async (req, res) => {
    try{
        const count = await countService.getCount();
        res.send(count);
    } catch (err) {
        res.status(400).send(err)
    }
});

router.post('/', async (req, res) => {
    try{
        console.log(req.body)
        const newCount = await countService.addCount(req.body);
        res.send(newCount);
    } catch (err) {
        res.status(400).send(err)
    }
});

router.post('/send', async (req, res) => {
    try {
        console.log(req.body)
        const newMesseges = await countService.sendNewMessages(req.body);
        res.send(newMesseges);
    } catch (err) {
        res.status(400).send(err)
    }
});

module.exports = router;