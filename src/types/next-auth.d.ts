import 'next-auth';
import { DefaultSession } from 'next-auth';
import { User as PrismaUser } from '@prisma/client';

type NarrowedPrismaUser = Pick<PrismaUser, 'role' | 'id' | 'username'>;

declare module 'next-auth' {
    interface User extends NarrowedPrismaUser {}

    interface Session {
        user: User & DefaultSession['user'];
    }
}
