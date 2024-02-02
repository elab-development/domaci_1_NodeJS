import Hotel from "../models/Hotel.js";

const addRestrictionToRating = async () => {
  try {
    await Hotel.updateMany(
      { rating: { $lt: 1 } },
      { $set: { rating: 1 } }
    );
    

    await Hotel.updateMany(
      { rating: { $gt: 10 } },
      { $set: { rating: 10 } }
    );
    
    console.log("Migration completed successfully");

  } catch (error) {
    console.error('Migration failed', error);
  }
};

export default addRestrictionToRating;

