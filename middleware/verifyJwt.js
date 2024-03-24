import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {findUserByEmail} from '../service/user_reg.service.js'

dotenv.config();

// Middleware to verify cookies for user
export const checkAdminAccess = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "No token provided"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        const isUserAuthorized = await findUserByEmail(decoded.email)

        // console.log(isUserAuthorized);
        const {role}= isUserAuthorized
        if (role!== 'Admin') {
            return res.status(401).json({
                message: "You are not authorized to access this resource"
            });
        }

        const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
        if (decoded.exp && decoded.exp < currentTime) {
            return res.status(401).json({
                message: "Token has expired"
            });
        }

        req.decoded = decoded;
        next();
    } catch (error) {
        console.error("Error verifying user token:", error);
        return res.status(401).json({
            message: "Invalid token"
        });
    }
}
