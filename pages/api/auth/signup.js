// OWN
import { hashPassword } from "../../../helpers/auth";
import { connectToDatabase } from "../../../helpers/db-utils";


async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;
        const { email, password } = data;

        if (!email ||
            !email.includes('@') ||
            !password ||
            password.trim().length < 7
        ) {
            res.status(422).json({
                message: 'Invalid input'
            })
            return;
        }
        let client;
        const hashedPassword = await hashPassword(password);
        try {
            client = await connectToDatabase();
        } catch (error) {
            res.status(500).json({
                message: 'Unable to connect to database'
            })
        }
        const db = client.db()

        const existingUser = await db.collection('users').findOne({
            email: email
        });

        if (existingUser) {
            res.status(422).json({ message: 'User exists already' });
            client.close();
            return;
        }
        let newUser;
        try {
            newUser = await db.collection('users').insertOne({
                email: email,
                password: hashedPassword
            });
        } catch (error) {
            res.status(500).json({
                message: 'Unable to insert user in database'
            })
            client.close();
        }
        client.close();
        res.status(201).json({
            message: 'User saved in database',
            user: newUser
        });
    }
}

export default handler;