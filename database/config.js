const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_CNN, { autoIndex: true });

    console.log("Connected to the database.");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
    throw new Error("Failed to start the database.");
  }
};

const dbDisconnection = async () => {
  try {
    await mongoose.disconnect();

    console.log("Disconnected from the database.");
    process.exit(0);
  } catch (error) {
    console.error("Error disconnecting from the database:", error.message);
    process.exit(1);
  }
};

module.exports = {
  dbConnection,
  dbDisconnection,
};
