import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

const addFkToRooms = async () => {
  try {
    const hotels = await Hotel.find(); // Dohvata sve hotele

    for (let hotel of hotels) {
      for (let roomId of hotel.rooms) {
        await Room.findByIdAndUpdate(roomId, { $set: { hotel: hotel._id } });
      }
    }
    console.log('All rooms have been successfully linked to hotels');
  } catch (error) {
    console.error('Failed to link rooms to hotels', error);
  }
};

export default addFkToRooms;

