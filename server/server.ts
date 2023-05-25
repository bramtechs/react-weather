import express from 'express';
import { gatekeepUserRequest } from './balancer.js';
import { fetchCached, printCache } from './cacher.js';

const app = express();
const port = 3000;

app.use(express.json());

app.get('*', async (req, res) => {
    try {
        gatekeepUserRequest(req);
    } catch (e: any) {
        res.status(400).send({ error: e.message });
        return;
    }
    const url = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
    const cached = await fetchCached(url);
    if (cached) {
        res.header('Access-Control-Allow-Origin', '*');
        res.status(200).send(cached.data);
    } else {
        res.status(404).send({ error: 'Could not fetch data!' });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
