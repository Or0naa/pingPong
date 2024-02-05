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





module.exports = countModel;