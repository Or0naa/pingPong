const { Client } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal');
const countService = require('./tryToCount/count.service')
const express = require('express');
const router = express.Router();


const client = new Client()

let qrCode;


// client.on('qr', (qr) => {
    // console.log('QR RECEIVED', qr)
    // qrcode.generate(qr, { small: true })
    // console.log('QR RECEIVED', qr)
//     response.send(qr);

// })


router.get('/', async (req, res) => {
  try {
    qrCode = await new Promise(resolve => {
      client.once('qr', qr => {
        resolve(qr);
      });  
    });
    res.send(qrCode);

  } catch (err) {
    // handle error 
  }
});

// const WebSocket = require('ws');
// const wss = new WebSocket.Server({ port: 3666 });

// wss.on('connection', (ws) => {
//     ws.on('message', (message) => {
//         const data = JSON.parse(message);
//         if (data.type === 'qrCode') {
//             const qrCode = data.data;
//             // עבודה נוספת עם ה-QR code בשרת
//         }
//     });
// });


client.on('ready', () => {
    console.log('Client is ready!');
});


async function start() {
    const player = await countService.getCount()
    return player
}

let players = []

start().then(res => {
    players = res
})

let dataMesseges = {
    "received": "",
    "response": ""
}
async function newMessege() {
    const message = await countService.newDataMesseges()
    dataMesseges = message;
    return message
}


newMessege().then(res => {
    dataMesseges = res
    // console.log("פה קורה הקסם",dataMesseges)}
}
)


//     players.forEach(player => {
//         client.sendMessage(player.player, `You are playing ${player.games} games`)

//   });

client.on('message', async (message) => {
    newMessege()

    if (message.body.toLowerCase() === 'ping') {
        await message.reply('pong')
        let player = players.find((p) => p.player === message.from)
        if (player) {
            await countService.updateGames(player.player)
        } else {
            await countService.addCount({
                player: message.from,
                games: 1
            })
        }

    }
    // console.log(players)

    if (message.body === 'מה') {
        await message.reply('מותה')
    }
    if (message.body === 'אבא שלך ערומקו?') {
        await message.reply('לא')
    }

    if (message.body === dataMesseges.received) {
        await message.reply(dataMesseges.response)
    }


})

client.initialize()

module.exports = { client, router };