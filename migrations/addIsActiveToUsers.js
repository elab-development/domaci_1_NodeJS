import User from "../models/User.js";

const addIsActiveToUsers = async () => {
  try {
    await User.updateMany({}, { $set: { isActive: "false" } });
    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration failed', error);
  }
};

export default addIsActiveToUsers;

