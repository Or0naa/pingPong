const { Client, MessageMedia } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal');
const countService = require('./tryToCount/count.service')
// require('../../../../../../../ProgramData/Microsoft/Windows/Start Menu/Programs/')
const express = require('express');
const router = express.Router();


const client = new Client(
    {
        puppeteer: {
            executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
        }
    }
)

const clientsData = {};


client.on('qr', async (qr) => {
    // בדוק אם כבר יש מידע על המשתמש (ממערך clientsData)
    if (!clientsData[client.userId]) {
        // סרוק ושמור את המידע פעם ראשונה
        qrcode.generate(qr, { small: true });
        client.once('authenticated', async (session) => {
            const clientId = session.client.id._serialized;
            const userId = session.user.id._serialized;
            const sessionToken = session.WABrowserId;

            // שמור את הנתונים באובייקט לפי מזהה המשתמש
            clientsData[clientId] = {
                userId,
                sessionToken
            };

            // טען את המידע של המשתמש
            await client.loadSession(sessionToken, userId);
        });
    }
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
}
)


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



const clients = [
    {
        name: 'ישראל',
        chatId: '972558890475@c.us'
    },
    {
        name: 'גילה',
        chatId: '972587969183@c.us'
    },
    {
        name: 'צבי',
        chatId: '972556841208@c.us'
    },
    {
        name: 'אלירז',
        chatId: '972503210090@c.us'
    }
];

const imagePath = '/cat.jpg';






// const sumone = clients.find(c => c.name === clientName);

// if (!sumone) {
//     console.log('לקוח לא נמצא');
//     return;
// }

// const chatId = sumone.chatId;
// const message = 'היי ' + clientName + ', זו הודעה אישית לך!';








// sendMessageToClient();




client.initialize()

module.exports = { client, router }