import { MongoClient } from 'mongodb';

async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, name, message } = req.body;
        if (!email ||
            !email.includes('@') ||
            !name ||
            name.trim() === '' ||
            !message ||
            message.trim() === ''
        ) {
            res.status(422).json({
                message: 'Invalid input'
            })
            return;
        }

        // Store in the database
        const newMessage = {
            email: email,
            name: name,
            message: message
        };
        let client
        // Connect to database
        const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_cluster}.6tifb.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

        try {
            client = await MongoClient.connect(connectionString);
        } catch (error) {
            res.status(500).json({
                message: 'Unable to connect to database',
                error: error
            })
        }

        const db = client.db(process.env.mongodb_database);
        try {
            const result = await db.collection('messages').insertOne(newMessage);
            newMessage.id = result.insertedId;
        } catch (error) {
            client.close();
            res.status(500).json({
                message: 'Unable to insert in collection'
            })
        }

        client.close();

        res.status(201).json({
            message: 'Message saved',
            newMessage: newMessage
        })
    }
}

export default handler;