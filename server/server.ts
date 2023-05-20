import express from 'express';
import { gatekeepUserRequest } from './balancer.js';

const app = express();
const port = 3000;

app.use(express.json());

app.get('*', (req, res) => {
    // get unique identifier of the sender
    if (gatekeepUserRequest(req)) {
        res.send(`Full URL!: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
