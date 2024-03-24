import {validateSignupInput }from '../utils/utils.js';
import {validateLoginInput} from '../utils/utils.js';
import  {saveUser,findUserByEmail } from '../service/user_reg.service.js';
import {comparePassword} from '../config/bcrypt.js'
import jwt from 'jsonwebtoken'


export const signUp=async(req,res)=>{
     try{
      const {email,password,firstname,lastname}=req.body
      const inputValidation=  validateSignupInput(email,password,firstname,lastname)
      if(inputValidation.errors){
         res.status(400).json(inputValidation.errors)
      }
      const exisitingUser= await findUserByEmail(email);
      if(exisitingUser){
         return res.status(400).json({message: 'User already exists'})
      }
      let role= "user";
      const companyEmailRegex = /^[^@\s]+@(?:[^.@\s]+\.)?courage\.com$/;
      if(companyEmailRegex.test(email)){
          role= "Admin";
      }
    await saveUser(email,password,firstname,lastname,role);
    res.status(200).json({message:"user registered successfully"});
     }catch(error){
        console.log("Error occurred while signup",error);
        console.log(error)
        res.status(500).json({message: "Internal server error", error: error});
     }
}

export const login = async(req, res) =>{
   try{
      const {email,password}=req.body
      const inputValidation=  validateLoginInput({email,password})
      if(inputValidation.errors){
         res.status(400).json(inputValidation.errors)
      }
     const result = await comparePassword(email,password)
     if(!result){
     return res.status(400).json({message: 'Invalid password'})
     }
    const payload= {email}
    const token = jwt.sign(payload, process.env.JWT_SECRET,{expiresIn: '1h'})
    res.cookie("token", token ,{httpOnly : true})
      return res.status(200).json({message:"user successfully login",token});
   }catch(error){
      console.log("Error occurred while login",error)
      res.status(500).json({message: "Internal server error", error: error});
   }
}

export const forgotPassword = async (req, res) => {
   try {
       const { email, password } = req.body;
       const existingUser = await dataBaseCall(email);
       if (!existingUser) {
           return res.status(400).json({ message: "User does not exist" });
       }
       const userId = existingUser._id;
       const updatedUser = await updatePassword(userId, password);
       if (!updatedUser) {
           return res.status(400).json({ message: "Couldn't update password" });
       }
       return res.status(200).json({message:"password change successful"});
   } catch (error) {
       console.error("Error in forgotPassword:", error);
       return res.status(500).json({ message: "Internal server error" });
   }
}
export const deleteUsers= async(req, res) =>{
   try{
       const {email}=req.body;
       if(!email){
           return res.status(400).json({
               message:"Please provide email"
           })
       }
      const getuserid= await dataBaseCall(email)
       const id = getuserid._id
       const deletedUser = await deleteUser(id);
       if(!deletedUser){
           return res.status(400).json({
               message:"Couldn't delete user"
           })
       }
       return res.status(200).json({message:"user deleted successfully"});
   }catch(error){
 return res.status(500).json({
           message: "Internal server error"
       })
   }
}
