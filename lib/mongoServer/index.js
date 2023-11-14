// this is where we can connect to mongodb
import { MongoClient } from "mongodb";

const URI = process.env.MONGODB_URI; // connecting MopngoDB Uri
const options = {};
if (!URI) throw new Error("Please add your MongoDB URI"); // Err Handling

let client = new MongoClient(URI, options);
let clientPromise;

if (process.env.NODE_ENV !== "production") {
  //sharing this mongo client in a global variable soo we are not re-creating connection for every query
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = client.connect();
}

export default clientPromise;
