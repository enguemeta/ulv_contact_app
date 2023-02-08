import { Contact, PrismaClient } from '@prisma/client';
import { Envs } from '@/utils/config';

declare global {
  namespace NodeJS {
    interface Global {}
  }
}

type dataProps = {
  id: number;
  title: string;
  email: string;
  content: string;
  createdBy: string | null;
  responsed: boolean;
};

interface CustomNodeJSGlobal extends NodeJS.Global {
  prisma: PrismaClient;
}

declare const global: CustomNodeJSGlobal;
export const Contacts: Contact[] = [];

let prisma = new PrismaClient({ log: ['query', 'info'] });

if (Envs.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;
