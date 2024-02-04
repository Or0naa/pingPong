const countController = require('./count.controller')


async function getCount() {
    const count = await countController.readAll()
    return count
}

async function addCount(count) {
    const newCount = await countController.createP(count)
    return newCount
}

async function updateGames(player) {
    const newCount = await countController.updateG(player)
    return newCount
}

async function sendNewMessages(messages) {
    let rec = "";
    let res = "";

    if (messages) {
        rec = messages.received;
        res = messages.response;
    }
    if (!messages){
        throw ""
    }

    const newMessages = {
        received: rec,
        response: res
    };

    await countController.sendMessages(newMessages);
    return newMessages;
}

// sendNewMessages({
//     "received": "🐈",
//     "response": "זה חתול"
// });


async function newDataMesseges() {
    const messages = await countController.readAllMessages();
    
    if (messages.length > 0) {
        return messages[messages.length - 1];
    } else {
        return {};
    }
}


module.exports = { getCount, addCount, updateGames, sendNewMessages, newDataMesseges }