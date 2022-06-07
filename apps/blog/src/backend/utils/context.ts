import { getSession } from 'next-auth/react';
import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { IncomingMessage } from 'http';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import prisma from '@/lib/prisma';

type SSRContextOptions = {
  req: IncomingMessage & { cookies: NextApiRequestCookies };
  res?: never; // Previous thought: `res?: ServerResponse;`
};

export const createContext = async (
  opts?: trpcNext.CreateNextContextOptions | SSRContextOptions,
) => {
  const session = await getSession({ req: opts?.req });
  return { req: opts?.req, res: opts?.res, prisma, session };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
