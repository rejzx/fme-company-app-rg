// https://github.com/prisma/prisma/issues/6219#issuecomment-840676092
import { PrismaClient } from '@prisma/client';

declare global {
  namespace NodeJS {
    interface Global {
      db: PrismaClient;
    }
  }
}

let db: PrismaClient;

if (typeof window === 'undefined') {
  if (process.env.NODE_ENV === 'production') {
    db = new PrismaClient();
  } else {
    // @ts-ignore
    if (!global.prisma) {
      // @ts-ignore
      global.prisma = new PrismaClient();
    }
    // @ts-ignore
    db = global.prisma;
  }
}
// @ts-ignore
export default db;