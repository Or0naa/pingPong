const mongoose = require('mongoose')

const messegeSchema = new mongoose.Schema({
    received: {
        type: String,
    },
    response: {
        type: String,
    }
})
const messageModel = mongoose.model('message', messegeSchema)

// async function starter(play){
//     await countModel.create(play)
// }



module.exports = messageModel;