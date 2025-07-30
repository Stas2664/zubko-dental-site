// Vercel API Route для отправки в Telegram
module.exports = async function handler(req, res) {
  // Разрешаем CORS для всех доменов
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Обрабатываем OPTIONS запрос (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Принимаем только POST запросы
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const data = req.body;
    
    if (!data || !data.name || !data.phone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Chat ID твоей группы "Сайт Стоматолог"
    const botToken = '7535946322:AAGpiSvEsyBWama9QC-ydaRAF7Y94yutoc8';
    const chatId = '-1002827782723';

    // Формируем сообщение
    const message = `🦷 *Новая заявка с сайта*

👤 *Имя:* ${data.name}
🎂 *Возраст:* ${data.age} лет
📞 *Телефон:* ${data.phone}
🩺 *Жалобы:* ${data.complaints}

⏰ *Время:* ${new Date().toLocaleString('ru-RU', {
      timeZone: 'Europe/Moscow',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })}`;

    // Отправляем в Telegram
    const telegramResponse = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown'
      })
    });

    if (telegramResponse.ok) {
      return res.status(200).json({ 
        success: true, 
        message: 'Заявка успешно отправлена в Telegram!' 
      });
    } else {
      const error = await telegramResponse.text();
      console.error('Telegram API Error:', error);
      return res.status(500).json({ 
        error: 'Ошибка отправки в Telegram',
        details: error 
      });
    }

  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({ 
      error: 'Внутренняя ошибка сервера',
      details: error.message 
    });
  }
}
