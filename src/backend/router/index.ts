import * as trpc from '@trpc/server';
import superjson from 'superjson';
import { usersRouter } from './users';
import { userRouter } from './user';
import { friendRequestRouter } from './friendRequest';

export const appRouter = trpc
    .router()
    .transformer(superjson)
    .merge('users.', usersRouter)
    .merge('user.', userRouter)
    .merge('friendRequest.', friendRequestRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
