const countModel = require('./count.model')
const messageModel = require('../messeges.model')

async function readAll() {
    const count = await countModel.find()
    return count
}

async function createP(count) {
    const newCount = await countModel.create(count)
    return newCount
}

async function updateG(name) {
    const newCount = await countModel.updateOne({ player: name }, { $inc: { games: 1 } })
    return newCount
}

async function sendMessages(data) {
    // await messageModel.deleteMany()
    const newData = await messageModel.create(data)
    console.log(newData)
    return newData
}





async function readAllMessages(){
    return await messageModel.find()
}

module.exports = { readAll, createP, updateG, sendMessages, readAllMessages }