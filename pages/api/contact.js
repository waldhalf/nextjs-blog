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
        try {
            client = await MongoClient.connect('mongodb+srv://aghnaros:G38qqHXA58eY6bs@cluster0.6tifb.mongodb.net/nextjs-blog?retryWrites=true&w=majority');
        } catch (error) {
            res.status(500).json({
                message: 'Unable to connect to database'
            })
        }

        const db = client.db('nextjs-blog');
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