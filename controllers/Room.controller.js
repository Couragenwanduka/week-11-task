import { createRoom, createRoomType, findRoomByName,  } from '../service/room.service.js'
import {findRoomById, updateRoomById, deleteRoomById} from '../service/room.service.js';
import{ filterRooms,   getAllRoomTypes,findRoomTypeByName} from '../service/room.service.js';
/*
roomtype function is used to register a roomtype 
* it also saves the room with an id that fits to the specified room type
*/ 

export const createRoomTypeHandler=async(request, response)=>{
  try {
    const { name } = request.body;
    if (!name) {
      return response.status(400).json({
        message: "Please provide a name"
      });
    }
    const existingRoomtype= await findRoomTypeByName(name)
    if(existingRoomtype){
      response.status(200).json({message: "RoomType already exists"});  
    }
   const roomtype = await createRoomType(name)
   return response.status(201).json({ message: "RoomType created successfully", room: roomtype });
  } catch (error) {
    response.status(400).json({ message: error.message });
    console.log(error);
  }
}
/**
 * this is used to create a new room
 * checks for empty fields 
 * checks if the room and id already exists
 */
export const createRoomHandler= async(request, response)=>{
  try {
    const {name, roomtype,description,price} = request.body;
    if ( !name || !roomtype||!description||!price){
      return response.status(400).json({
        message: "Please complete the fields"
      })
    }
    const roomType= await findRoomTypeByName(roomtype)
    if (!roomType) {
      return response.status(400).json({
        message: "Please provide a valid room type"
      })
    }
    const existingRoom = await findRoomByName(name)
    if (!existingRoom) {
     const newRoom= await createRoom(name,roomType._id,description,price)
   return response.status(201).json({ message: "Room created successfully", room: newRoom })
    }else{
      return response.status(400).json({
        message: "Room already exists"
      })
    }
    
  } catch (error) {
    response.status(400).json({ message: error.message });
    console.log(error)
  }
}
export const getAllRoomsHandler = async(request, response)=>{
    try {
        const allRooms= await getAllRoomTypes()
        return response.status(200).json(allRooms);
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            message: "Internal server error"
        })
    }
}
export const searchRoomsHandler =async(request, response)=>{
    try{
 const filteredRooms = await  filterRooms(request)
 return response.status(200).json(filteredRooms);
}catch(error){
console.log("Error retrieving rooms",error)
    return response.status(500).json({
        message: "Internal server error"
    })
};
}

export const getRoomByIdHandler = async (request, response) => {
    try {
        const roomId = request.params.id;
        if (!roomId) {
            return response.status(400).json({
                message: "Please provide a valid room ID"
            });
        }

        const room = await findRoomById(roomId);
        if (!room) {
            return response.status(404).json({
                message: "Room not found"
            });
        }

        return response.status(200).json(room);
    } catch (error) {
        console.error("Error retrieving room by ID:", error);
        return response.status(500).json({
            message: "Internal server error"
        });
    }
}

export const updateRoomHandler = async (request, response) => {
    try {
        const { id } = request.params;
        const { name, price } = request.body;
        if (!id || !name  || !price) {
            return response.status(400).json({
                message: "Please provide all required fields: id, name, roomtype, price"
            });
        }

        const updatedRoom = await updateRoomById(id, name, price);
        if (!updatedRoom) {
            return response.status(404).json({
                message: "Room not found"
            });
        }

        return response.status(200).json(updatedRoom);
    } catch (error) {
        console.error("Error updating room:", error);
        return response.status(500).json({
            message: "Internal server error"
        });
    }
}

export const deleteRoomHandler = async (request, response) => {
    try {
        const { id } = request.params;
        if (!id) {
            return response.status(400).json({
                message: "Please provide a valid room ID"
            });
        }

        const deletedRoom = await deleteRoomById(id);
        if (!deletedRoom) {
            return response.status(404).json({
                message: "Room not found"
            });
        }

        return response.status(200).json({
            message: "Room deleted successfully",
            deletedRoom
        });
    } catch (error) {
        console.error("Error deleting room:", error);
        return response.status(500).json({
            message: "Internal server error"
        });
    }
}
