import prisma from '@/prisma/client';
import { withApiAuthRequired } from '@auth0/nextjs-auth0';
import { Contact } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const createContact = withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const contact: Contact = JSON.parse(req.body);

    if (req.method === 'POST') {
      if (!contact.title.length) {
        res.status(400).json({ message: 'The title is empty' });
      }
      if (!contact.email.length) {
        res.status(400).json({ message: 'Email is empty' });
      }

      if (!contact.content.length) {
        res.status(400).json({ message: 'The Content is empty' });
      }

      try {
        const data: Contact = await prisma.contact.create({
          data: {
            title: contact.title,
            email: contact.email,
            content: contact.content,
            responsed: false,
          },
        });
        res.status(200).json(data);
      } catch (err) {
        res.status(500).json({
          message: 'Error creating a new contact infos',
          details: err,
        });
      } finally {
        await prisma.$disconnect();
      }
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
export default createContact;
