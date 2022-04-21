import { MongoClient } from 'mongodb';

// /api/new-meetup
// POST /api/new-meetup

async function handler(req, res) {
  if (req.method === 'POST') {
    const data = req.body;

    const client = await MongoClient.connect(
      'mongodb+srv://testUser:GUFjcrauEyfypfnn@clustertest.q80fq.mongodb.net/testDB?retryWrites=true&w=majority'
    );
    const db = client.db();

    const meetupsCollection = db.collection('FirstDB');

    const result = await meetupsCollection.insertOne(data);

    console.log(result);

    client.close();

    res.status(201).json({ message: 'Přidáno!' });
  }
}

export default handler;
