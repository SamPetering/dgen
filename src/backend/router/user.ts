import * as trpc from '@trpc/server';
import { prisma } from '../../db/client';
import * as z from 'zod';

export const userRouter = trpc.router().query('create', {
  input: z.object({
    email: z.string({
      required_error: 'Email is required',
    }),
    name: z.string().optional(),
  }),
  async resolve({ input }) {
    return await prisma.user.create({
      data: {
        email: input.email,
        name: input.name,
      },
    });
  },
});
