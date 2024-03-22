const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

const corsOptions = {
  origin: 'http://localhost:8080',
}

// Используем CORS middleware
app.use(cors(corsOptions));

app.get('/add', (req, res) => {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);
    if (!isNaN(a) && !isNaN(b)) {
        const result = a + b;
        res.json({ result });
    } else {
        res.status(400).json({ error: 'Неверные параметры' });
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});

