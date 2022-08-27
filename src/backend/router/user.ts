import * as trpc from '@trpc/server';
import { prisma } from '../../db/client';
import * as z from 'zod';

export const userRouter = trpc
    .router()
    .mutation('create', {
        input: z.object({
            email: z
                .string({
                    required_error: 'Email is required',
                })
                .min(5),
            username: z.string().optional(),
        }),
        async resolve({ input }) {
            return await prisma.user.create({
                data: {
                    email: input.email,
                    username: input.username,
                },
            });
        },
    })
    .mutation('updateProfile', {
        input: z.object({
            userId: z.number({
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
    });
