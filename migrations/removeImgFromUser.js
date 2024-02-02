import User from "../models/User.js";

const removeImgFromUser = async () => {
  try {
    await User.updateMany({}, { $unset: { img: 1 } });
    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Migration failed', error);
  }
};

export default removeImgFromUser;

