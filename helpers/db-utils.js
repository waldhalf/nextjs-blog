import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
    // Connect to database
    const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_cluster}.6tifb.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

    const client = await MongoClient.connect(connectionString);

    return client;
}