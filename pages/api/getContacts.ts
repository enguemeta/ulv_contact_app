import type { NextApiRequest, NextApiResponse } from 'next';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import prisma from '@/prisma/client';

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = await prisma.contact.findMany({
      select: {
        id: true,
        title: true,
        email: true,
        content: true,
        responsed: true,
      },
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ 'ERROR ': error });
  } finally {
    await prisma.$disconnect();
  }
});
