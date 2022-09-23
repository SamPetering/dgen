import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from '../../../db/client';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

export default NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        }),
    ],
    secret: process.env.JWT_SECRET,
    callbacks: {
        async session({ session, user }) {
            session.user.role = user.role;
            session.user.id = user.id;
            session.user.username = user.username;
            return session;
        },
    },
});
