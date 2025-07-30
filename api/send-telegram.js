const https = require('https');

module.exports = (req, res) => {
  // CORS заголовки
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Обработка preflight запроса
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Только POST запросы
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  // Получаем данные
  const { name, age, phone, complaints } = req.body;

  // Проверяем обязательные поля
  if (!name || !phone) {
    res.status(400).json({ error: 'Отсутствуют обязательные поля' });
    return;
  }

  // Формируем сообщение
  const message = `🦷 Новая заявка с сайта

👤 Имя: ${name}
🎂 Возраст: ${age} лет
📞 Телефон: ${phone}
🩺 Жалобы: ${complaints}

⏰ Время: ${new Date().toLocaleString('ru-RU')}`;

  // Настройки Telegram
  const botToken = '7535946322:AAGpiSvEsyBWama9QC-ydaRAF7Y94yutoc8';
  const chatId = '-1002827782723';
  
  // Данные для отправки
  const postData = JSON.stringify({
    chat_id: chatId,
    text: message
  });

  // Настройки запроса
  const options = {
    hostname: 'api.telegram.org',
    port: 443,
    path: `/bot${botToken}/sendMessage`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': postData.length
    }
  };

  // Отправляем запрос
  const request = https.request(options, (response) => {
    let data = '';
    
    response.on('data', (chunk) => {
      data += chunk;
    });
    
    response.on('end', () => {
      if (response.statusCode === 200) {
        res.status(200).json({ 
          success: true, 
          message: 'Заявка отправлена!' 
        });
      } else {
        res.status(500).json({ 
          error: 'Ошибка Telegram API',
          details: data 
        });
      }
    });
  });

  request.on('error', (error) => {
    res.status(500).json({ 
      error: 'Ошибка сети',
      details: error.message 
    });
  });

  request.write(postData);
  request.end();
};
