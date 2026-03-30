const mongoose = require("mongoose");

const dbstatusMap = {
	0: "disconnected",
	1: "connected",
	2: "connecting",
	3: "disconnecting"
};

const connectdb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    const dbstatus = mongoose.connection.readyState;
    console.log(`MongoDB connection status: ${dbstatusMap[dbstatus]}`);
  } catch (error) {
    console.log(`MongoDB connection error: ${error}`);
  };
};

module.exports = { connectdb }