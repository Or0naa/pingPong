const { Client, MessageMedia, LocalAuth } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal');
const countService = require('./tryToCount/count.service')
const express = require('express');
const router = express.Router();



const client = new Client(
    {
        puppeteer: {
            executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
        }
    }

)



client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
})

client.on('ready', () => {
    console.log('Client is ready!');
})


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


function sendMessageToClient() {

    client.on('ready', async () => {
        console.log('Client is ready!')
        for (let i = 0; i < clients.length; i++) {
            const chatId = clients[i].chatId;

            client.sendMessage(chatId, "סתם הודעת טקסט", { sendSeen: true });
            console.log(clients[i].name + 'laughing');
            client.sendMessage(chatId, 'היי ' + clients[i].name + ", ככה עובדים עלייך שזאת פנייה אישית", { sendSeen: true });
            //  ככה שולחים טקסט
            const media1 = MessageMedia.fromFilePath('./aa.jpeg');
            //  ככה שולחים מדיה
            await client.sendMessage(chatId, media1, { caption: " זוהי תמונה" });
            // {unsafeMime: true} מוסיפים את זה אם לא יודעים את מקור הקובץ ורוצים להוריד בכל מקרה
            const media2 = MessageMedia.fromFilePath('./monkey.mp4') // וידאו. נשלח אחרי התקנת פופיטיר+ הוספה באיתחול של הקליינט קישור לכרום
            await client.sendMessage(chatId, media2, { caption: "וככה שולחים וידאו ואין אפשרויות נוספות" });
            await delay(7000);

        }
    })
}


async function delay(t) {
    return new Promise(resolve => setTimeout(resolve, t))
}
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