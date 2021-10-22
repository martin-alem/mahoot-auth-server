import mongoose from "mongoose";

async function connectToMahootDatabase() {
  const options = { keepAlive: true, keepAliveInitialDelay: 300000 };
  try {
    mongoose.connection.on("connecting", () => console.log("Connecting to Mongodb..."));
    mongoose.connection.on("connected", () => console.log("Connected to Mahoot Database successfully"));
    console.log(process.env.DB_URL);
    await mongoose.connect(process.env.DB_URL, options);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

export default connectToMahootDatabase;
