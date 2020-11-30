import express, { Response } from 'express';

const app = express();
const PORT = process.env.PORT || 8080;

app.get('*', (_, res: Response) => {
    return res.json({ message: 'hello world'});
});

app.listen(PORT, () => (console.log(`App running on port: ${PORT} 🚀`)))
