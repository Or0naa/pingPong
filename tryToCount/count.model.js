const mongoose = require('mongoose')

const countSchema = new mongoose.Schema({
    player: {
        type: String,
    },
    games: {
        type: Number,
    }
})
const countModel = mongoose.model('count', countSchema)

// async function starter(play){
//     await countModel.create(play)
// }



module.exports = countModel;