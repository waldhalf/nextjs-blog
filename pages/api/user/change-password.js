import { getSession } from 'next-auth/client';
import { verifyPassword, hashPassword } from '../../../helpers/auth';
import { connectToDatabase } from '../../../helpers/db-utils';

async function handler(req, res) {
    if (req.method !== 'PATCH') {
        return;
    }

    console.log('DANS API');

    const session = await getSession({ req: req });

    if (!session) {
        res.status(401).json({ message: 'Not authenticated' })
        return;
    }
    console.log('__________APRES CHECK SEESSION__________');

    const userEmail = session.user.email;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;

    const client = await connectToDatabase();
    const usersCollection = client.db().collection('users');
    const user = await usersCollection.findOne({ email: userEmail });

    if (!user) {
        res.status(404).json({ message: 'User not found' })
        client.close();
        return;
    }
    console.log('__________APRES CHECK USER__________');

    console.log('__________USER__________');
    console.log(user);


    const currentPassword = user.password;
    console.log('__________PASSWORD__________');

    console.log(oldPassword, currentPassword);
    const passwordAreEqual = await verifyPassword(oldPassword, currentPassword);

    console.log('__________PASSWORD ARE EQUAL__________');



    if (!passwordAreEqual) {
        res.status(403).json({ message: 'You are not allowed to do this operation. Invalid Password' });
        client.close();
        return
    }
    console.log('__________APRES CHECK EQUAL PASSWORD__________');


    const hashedPassword = await hashPassword(newPassword);
    console.log(hashedPassword);
    console.log('__________TTTTTTT__________');


    const result = usersCollection.updateOne(
        { email: userEmail }, {
        $set: { password: hashedPassword }
    });
    client.close();
    res.status(200).json({ message: 'Password updated' });


}

export default handler;