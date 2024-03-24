import mongoose from 'mongoose';

const users= mongoose.Schema({
     email:{
        type: String,
        unqiue: true,
        required: true,
        lowercase: true
     },
     password:{
        type: String,
        required: true,
        trim: true
     },
     role:{
        type: String,
        enum:["user", "Admin"],
        default: 'user'
     },
     firstname:{
       type: String,
       required: false
     },
     lastname:{
       type: String,
       required: false
     },
    
})



const User = mongoose.model('User', users);

export default User;
 