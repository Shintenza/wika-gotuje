import mongoose from 'mongoose';

let isConnected = false; // track the connection

export const connectDb = async () => {
  mongoose.set('strictQuery', true);

  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: 'wika_gotuje',
    });

    isConnected = true;

    console.log('MongoDB connected');
  } catch (error) {
    console.log(error);
  }
};
