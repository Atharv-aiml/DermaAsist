import { PrismaClient } from '@prisma/client';

import path from 'path';

declare global {
  // Allow global prisma in development to prevent multiple instances during hot-reloads
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const dbPath = path.resolve(__dirname, '../../prisma/dev.db');
const databaseUrl = process.env.DATABASE_URL?.startsWith('postgresql')
  ? process.env.DATABASE_URL
  : `file:${dbPath}`;

export const prisma = global.prisma || new PrismaClient({
  datasources: {
    db: {
      url: databaseUrl
    }
  },
  log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error']
});

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

export default prisma;
