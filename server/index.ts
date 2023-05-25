import express from 'express';

const app = express();
const port = 3000;

app.use(express.json());

app.get('*', (req, res) => {
    const text = `Full URL!: ${req.protocol}://${req.get('host')}${req.originalUrl}`;
    console.log(text);
    res.appendHeader('Access-Control-Allow-Origin', '*');
    res.send(text);
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
