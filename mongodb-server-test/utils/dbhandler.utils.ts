import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';


const mongo = MongoMemoryServer.create();

export const dbConnect = async () => {
    
    const uri =  (await mongo).getUri();
//   const mongooseOpts = {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//   };

   mongoose.connect(uri, (err) => {
    if (err) console.error(err);
    }
    );
};


export const dbDisconnect = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  (await mongo).stop();
};