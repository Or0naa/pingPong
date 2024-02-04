const { mongoose } = require('mongoose');
require('dotenv').config()

const mongooseUrl = process.env.MONGO_URL
function connect() {

try{    
    mongoose.connect(mongooseUrl)
    console.log("connected to mongo")
}
catch (err) {
    console.log(err)
}
}
module.exports= {connect}