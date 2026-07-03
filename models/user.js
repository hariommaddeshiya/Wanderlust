const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
    }
});

//This occurs with newer versions of passport-local-mongoose. 
// When you import it using a standard CommonJS require(), 
// the actual plugin function gets nested inside a .default 
// property on the imported object instead of being exported as a direct function.
userSchema.plugin(passportLocalMongoose.default || passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);

