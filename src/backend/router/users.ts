import * as trpc from '@trpc/server';
import { prisma } from '../../db/client';
import superjson from 'superjson';

export const usersRouter = trpc
  .router()
  .transformer(superjson)
  .query('get-all', {
    async resolve() {
      return await prisma.user.findMany();
    },
  });
