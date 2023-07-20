import { NextApiResponse, NextApiRequest } from 'next';

const mockdb = [
  { email: 'test@email.co.uk', password: 'hashedpassword', uuid: '0000011', id: 0 }
];

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { email, password, uuid } = req.body;

    // Check if the UUID already exists in the mockdb
    const existingUser = mockdb.find(user => user.uuid === uuid);
    if (existingUser) {
      res.status(400).json({ message: 'User with the provided UUID already exists' });
    } else {
      // Generate a random id for the new user
      const id = Math.floor(Math.random() * 100000);

      // Add the new user to the mockdb
      const newUser = { email, password, uuid, id };
      mockdb.push(newUser);
      res.status(201).json({ message: 'User added successfully' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
