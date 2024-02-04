
// require('dotenv').config()
const { mongoose } = require('mongoose');

const mongooseUrl =
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