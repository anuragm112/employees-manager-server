const mongoose=require('mongoose');

const UserSchema=new mongoose.Schema({
    f_userName: {type: String, required: true},
    f_email: {type: String, required: true, unique: true},
    f_Pwd: {type: String, required: true}
});

const User=mongoose.model('User',UserSchema);
module.exports=User;