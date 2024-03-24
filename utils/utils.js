import   {signUpSchema,loginSchema} from '../config/joi.js'
import Joi from 'joi';


 export const validateSignupInput=(email,password,firstname,lastname)=>{
      try{
        const result= signUpSchema.validate(email,password,firstname,lastname)
        return result;
      }catch(error){
        console.log("Error occurred during input validation",error);
        throw new Error ("invalid input",error);
      }
}

export const validateLoginInput= (email,password)=>{
    try{
      const result= loginSchema.validate(email,password)
      return result;
    }catch(error){
      console.log("Error occurred during input validation",error);
      throw new Error ("invalid input",error);
    }
}

