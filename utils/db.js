import { MongoClient } from "mongodb";

const Client = new MongoClient(`mongodb://localhost:27017`)

export { Client };
