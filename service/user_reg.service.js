import User from '../model/user.js';
import {hashPassword} from '../config/bcrypt.js';

 export const saveUser= async(email,password,firstname,lastname,role)=>{
   try{
    const hashedPassword = await hashPassword(password);
    const newUser = new User({
        email,
        password: hashedPassword,
        firstname,
        lastname,
        role
       })
       return newUser.save()
   }catch(error){
    console.log("Error saving user: " + error)
   }
}

export const findUserByEmail= async(email)=>{
    try{
        const user = await User.findOne({email});
        return user;
    }catch(error){
        console.log("Error finding user by email: " + error)
    }
}

export   const updatePassword= async (userid,password) => {
    const hashedPassword = await hashPassword(password);
    const updatedUser = await User.findOneAndUpdate({_id:userid},{password:hashedPassword},{new:true})
    return updatedUser;
}
export const deleteUser=async(id)=>{
    try{
     const deleteUser = await User.findByIdAndDelete(id);
    return deleteUser;
    }catch(error){
     console.log(error);
     throw error
    }
 }




