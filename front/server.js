const express = require("express");
const path = require("path");
const app = express();
const port = 8080;

// Указываем папку, в которой находятся файлы вашего фронтенда (например, HTML, CSS, JavaScript)
app.use(express.static(path.join(__dirname, "public")));

// Запускаем сервер на указанном порту
app.listen(port, () => {
  console.log(`Фронтенд запущен на порту ${port}`);
});

//http://127.0.0.1:8080
