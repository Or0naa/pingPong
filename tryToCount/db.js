
// require('dotenv').config()
const { mongoose } = require('mongoose');

const mongooseUrl = "mongodb+srv://orna:orna4321@cluster0.ksct30c.mongodb.net/hey?retryWrites=true&w=majority"
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