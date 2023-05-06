import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

app.get('*', (req, res) => {
    res.send(`Full URL: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
