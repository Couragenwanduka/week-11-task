import joi from 'joi';

export const signUpSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(4).max(20).required(),
    firstname: joi.string().required(),
    lastname: joi.string().required(),
    role: joi.string().required(),
})

 export const loginSchema= joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(4).max(20).required(),
})

