import * as trpc from '@trpc/server';
import { prisma } from '../../db/client';
import * as z from 'zod';

const userIdInput = z.object({ userId: z.string() });

export const userRouter = trpc
    .router()
    .mutation('updateProfile', {
        input: z.object({
            userId: z.string({
                required_error: 'User Id is required',
            }),
            age: z.number({
                required_error: 'Age is required',
            }),
            height: z.number().optional(),
            weight: z.number().optional(),
        }),
        async resolve({ input }) {
            return await prisma.userProfile.create({
                data: {
                    userId: input.userId,
                    age: input.age,
                    height: input.height,
                    weight: input.weight,
                },
            });
        },
    })
    .mutation('updateRole', {
        input: z.object({
            userId: z.string({
                required_error: 'User Id is required',
            }),
            role: z.union([z.literal('ADMIN'), z.literal('USER')]),
        }),
        async resolve({ input }) {
            return await prisma.user.update({
                where: { id: input.userId },
                data: {
                    role: input.role,
                },
            });
        },
    })
    .mutation('getUser', {
        input: userIdInput,
        async resolve({ input }) {
            return await prisma.user.findFirst({
                where: {
                    id: input.userId,
                },
            });
        },
    })
    .query('getUserProfile', {
        input: userIdInput,
        async resolve({ input }) {
            return await prisma.user.findFirst({
                where: {
                    id: input.userId,
                },
                select: {
                    name: true,
                    id: true,
                    friends: true,
                    friendRequests: true,
                    checkins: true,
                    image: true,
                    username: true,
                    email: true,
                },
            });
        },
    })
    .query('getUserFriends', {
        input: userIdInput,
        async resolve({ input }) {
            return await prisma.user.findFirst({
                where: {
                    id: input.userId,
                },
                select: {
                    friends: {
                        select: {
                            name: true,
                            id: true,
                            image: true,
                        },
                    },
                },
            });
        },
    })
    .query('getUserFriendRequests', {
        input: userIdInput,
        async resolve({ input }) {
            return await prisma.friendRequest.findMany({
                where: {
                    userId: input.userId,
                },
                select: {
                    id: true,
                    friend: {
                        select: {
                            name: true,
                        },
                    },
                },
            });
        },
    });
