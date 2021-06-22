import 'reflect-metadata';
import express from 'express';

import './database';

const app = express();

app.get("/test", (req, res) => {
    return res.send("hi")
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Listening port ${PORT}`));