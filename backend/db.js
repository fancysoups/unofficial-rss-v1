const MONGO_URL = process.env.MONGO_URL;

const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
const connection = { isConnected: false };

const connectDB = async () => {
  if (connection.isConnected) return;
  const db = await mongoose.connect(MONGO_URL);
  connection.isConnected = db.connections[0].readyState;
};

export default connectDB;
