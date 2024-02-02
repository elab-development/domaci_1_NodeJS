
import mongoose from "mongoose";

const addUniqueKeyToHotel = async () => {
  try {
    await mongoose.connection.db.collection('hotels').createIndex({ name: 1, address: 1 }, { unique: true });
    console.log('Unique index on name and address added successfully to Hotel collection');
  } catch (error) {
    console.error('Failed to create unique index', error);
  }
}
  
  export default addUniqueKeyToHotel;

