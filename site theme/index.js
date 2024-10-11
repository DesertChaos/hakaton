const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const port = 3000;
const botToken = '7602626066:AAHKb0BWmiPral734oHGJeNWDDK4JBqlKjo';

const bot = new TelegramBot(botToken);
// Настройка хранилища для загружаемых файлов
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Добавляем уникальное имя файлу
    }
});

const upload = multer({ storage: storage });

app.use(express.static('public'));
app.use(express.json()); // Для обработки JSON-тел

// Обработчик Webhook
app.post(`/bot${botToken}`, (req, res) => {
    bot.processUpdate(req.body);
    res.sendStatus(200);
});

// Маршрут для обработки загрузки файла и отправки в Telegram
app.post('/process', upload.single('file'), (req, res) => {
    console.log('Файл загружен:', req.file);
    if (!req.file) {
        return res.status(400).json({ error: 'Файл не был загружен' });
    }

    const filePath = req.file.path;

    const form = new FormData();
    form.append('photo', fs.createReadStream(filePath));

    console.log('Отправляем файл в Telegram...');
    axios.post(`https://api.telegram.org/bot${botToken}/sendPhoto`, form, {
        headers: form.getHeaders(),
    })
    .then(response => {
        console.log('Ответ от Telegram:', response.data);

        // Проверяем, есть ли файл в ответе
        if (!response.data.result.photo) {
            console.error('Ошибка: Telegram не вернул фото.');
            return res.status(500).json({ error: 'Ошибка: Telegram не вернул фото.' });
        }

        const fileId = response.data.result.photo[response.data.result.photo.length - 1].file_id;

        // Получаем файл обратно через file_id
        bot.getFile(fileId)
            .then(fileInfo => {
                console.log('Информация о файле:', fileInfo); // Логируем информацию о файле
                const filePath = fileInfo.file_path;
                const fileLink = `https://api.telegram.org/file/bot${botToken}/${filePath}`;

                console.log('Ссылка на файл:', fileLink);

                // Отправляем ссылку на файл обратно на сайт
                res.json({ output: fileLink });
            })
            .catch(error => {
                console.error('Ошибка при получении файла:', error);
                res.status(500).json({ error: 'Ошибка при получении файла с сервера Telegram' });
            });
    })
    .catch(error => {
        console.error('Ошибка отправки файла в Telegram:', error);
        res.status(500).json({ error: 'Ошибка при отправке файла в Telegram' });
    });
});

// Старт сервера
app.listen(port, () => {
    console.log(`Сервер работает на http://localhost:${port}`);
});
