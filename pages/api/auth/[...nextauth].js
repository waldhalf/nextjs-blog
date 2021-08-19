import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { verifyPassword } from "../../../helpers/auth";
import { connectToDatabase } from "../../../helpers/db-utils";

export default NextAuth({
    session: {
        jwt: true
    },
    providers: [
        Providers.Credentials({
            async authorize(credentials) {
                const client = await connectToDatabase();
                const usersCollection = client.db().collection('users');
                const user = await usersCollection.findOne({ email: credentials.email });
                if (!user) {
                    client.close();
                    throw new Error('No user found');
                }
                const isPasswordValid = await verifyPassword(credentials.password, user.password);
                if (!isPasswordValid) {
                    client.close();
                    throw new Error('Could not log out in');
                }

                client.close();
                return {
                    email: user.email,
                }
            }
        })
    ]
});