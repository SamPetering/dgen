import * as trpc from '@trpc/server';
import { prisma } from '../../db/client';
import * as z from 'zod';

export const userRouter = trpc.router().mutation('updateProfile', {
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
});
