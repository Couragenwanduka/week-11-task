import express from 'express';
import { createRoomHandler,createRoomTypeHandler,getAllRoomsHandler } from '../Controllers/Room.controller.js';
import { searchRoomsHandler,getRoomByIdHandler } from '../Controllers/Room.controller.js';
import { updateRoomHandler,deleteRoomHandler } from '../Controllers/Room.controller.js';
import { checkAdminAccess} from '../middleware/verifyJwt.js';
import { signUp,login } from '../controllers/user_registration.js';
import {forgotPassword,deleteUsers} from '../controllers/user_registration.js';


const router = express.Router();


router.post('/api/v1/signup', signUp); // User signup
router.post('/api/v1/login', login); // User login
router.post('/api/v1/forgotpassword',forgotPassword);
router.post('/api/v1/deleteusers',deleteUsers);

// Public routes
router.get('/api/v1/rooms-types', getAllRoomsHandler); // Get all room types
router.get('/api/v1/rooms',  searchRoomsHandler); // Search rooms

// Protected routes (require authentication)
router.post('/api/v1/rooms-types', checkAdminAccess, createRoomTypeHandler); // Create a new room type
router.post('/api/v1/rooms', checkAdminAccess, createRoomHandler); // Create a new room
router.get('/api/v1/rooms/:id',checkAdminAccess, getRoomByIdHandler); // Get room by ID
router.patch('/api/v1/rooms/:id', checkAdminAccess, updateRoomHandler); // Update room by ID
router.delete('/api/v1/rooms/:id', checkAdminAccess, deleteRoomHandler); // Delete room by ID





export default router;