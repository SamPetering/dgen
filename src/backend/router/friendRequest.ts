import * as trpc from '@trpc/server';
import * as z from 'zod';
import { prisma } from '../../db/client';

export const friendRequestRouter = trpc
    .router()
    .mutation('accept', {
        input: z.object({ friendRequestId: z.number() }),
        async resolve({ input }) {
            // get friend request record
            const response = await prisma.friendRequest.findFirst({
                where: {
                    id: input.friendRequestId,
                },
                select: {
                    userId: true,
                    friendId: true,
                },
            });
            if (!response) return false;

            // add friend relation for both users
            await prisma.user.update({
                where: {
                    id: response.userId,
                },
                data: {
                    friends: {
                        connect: [{ id: response.friendId }],
                    },
                },
            });
            await prisma.user.update({
                where: {
                    id: response.friendId,
                },
                data: {
                    friends: {
                        connect: [{ id: response.userId }],
                    },
                },
            });

            // update friend request table
            await prisma.friendRequest.delete({
                where: {
                    id: input.friendRequestId,
                },
            });

            return true;
        },
    })
    .mutation('decline', {
        input: z.object({ friendRequestId: z.number() }),
        async resolve({ input }) {
            return await prisma.friendRequest.delete({
                where: {
                    id: input.friendRequestId,
                },
            });
        },
    });
