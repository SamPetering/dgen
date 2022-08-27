import * as trpc from '@trpc/server';
import { prisma } from '../../db/client';
import * as z from 'zod';

export const userRouter = trpc.router();
