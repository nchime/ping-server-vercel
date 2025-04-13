import express from 'express';
import serverless from 'serverless-http';

const app = express();

const streamMap = new Map();

app.all('/:id', async (req, res) => {
  const id = req.params.id;

  if (req.method === 'GET') {
    const stream = streamMap.get(id);
    if (!stream) {
      res.status(404).send('Not Found');
      return;
    }
    res.setHeader('Access-Control-Allow-Origin', '*');
    stream.pipe(res);
    stream.on('end', () => {
      streamMap.delete(id);
    });
  } else if (req.method === 'PUT' || req.method === 'POST') {
    streamMap.set(id, req);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send('Uploaded');
  } else if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', '*');
    res.status(204).end();
  } else {
    res.status(405).send('Method Not Allowed');
  }
});

export default app;
export const handler = serverless(app);