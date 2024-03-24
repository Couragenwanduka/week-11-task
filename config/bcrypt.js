import bcrypt from 'bcryptjs'

import User from '../model/user.js';

export const hashPassword = async(password)=>{
      try{
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        return hashedPassword
      }catch(error){
        console.log("error occurred while hashing password", error)
        throw new Error("Failed to hash password");
      }
}

export const comparePassword = async(email,password)=>{
    try{
        const user = await User.findOne({email})
        const match = await bcrypt.compare(password, user.password)
        return match
    }catch(error){
        console.log("error occurred while comparing password", error)
        throw new Error("Failed to compare password");
    }
}

