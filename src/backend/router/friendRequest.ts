import * as trpc from '@trpc/server';
import * as z from 'zod';
import { prisma } from '../../db/client';

export const friendRequestRouter = trpc
    .router()
    .mutation('create', {
        input: z.object({
            userId: z.string(),
            requestorId: z.string(),
        }),
        async resolve({ input }) {
            return await prisma.friendRequest.create({
                data: {
                    userId: input.userId,
                    requestorId: input.requestorId,
                },
            });
        },
    })
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
                    requestorId: true,
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
                        connect: [{ id: response.requestorId }],
                    },
                },
            });
            await prisma.user.update({
                where: {
                    id: response.requestorId,
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
    })
    .query('exists', {
        input: z.object({ userId: z.string(), requestorId: z.string() }),
        async resolve({ input }) {
            const resp = await prisma.friendRequest.findFirst({
                where: {
                    userId: input.userId,
                    requestorId: input.requestorId,
                },
            });
            return !!resp;
        },
    });
