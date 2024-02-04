// import(dotenv).config()
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3636
const {client} = require('./client.router');
const db = require('./tryToCount/db');
db.connect()


app.use(express.json());
app.use(cors());

const countRouter = require('./tryToCount/count.router')
const clientRouter = require('./client.router')
app.use('/play', countRouter)
app.use('/client', clientRouter.router)

app.listen(port, () => {
    console.log(`Start to ping and pong on: ${port}`);
});