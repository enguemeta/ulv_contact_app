import { handleProfile } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
  try {
    await handleProfile(req, res, {
      refetch: true,
      afterRefetch: async (_, __, session) => session,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error });
  }
};

export default handler;
