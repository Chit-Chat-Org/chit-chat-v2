import mongoose from 'mongoose';

const MONGODB_URI: string | undefined = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('MONGODB_URI is undefined');
}

const MongoDb = mongoose.connect(MONGODB_URI).then(()=>console.log("Connected to mongoDb !")).catch(err=> console.log(err))

export default MongoDb;