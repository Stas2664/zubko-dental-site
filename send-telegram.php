<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (!$data) {
        echo json_encode(['error' => 'Invalid JSON']);
        exit;
    }
    
    // Chat ID твоей группы "Сайт Стоматолог"
    $bot_token = '7535946322:AAGpiSvEsyBWama9QC-ydaRAF7Y94yutoc8';
    $chat_id = '-1002827782723';
    
    $message = "🦷 *Новая заявка с сайта*\n\n";
    $message .= "👤 *Имя:* " . htmlspecialchars($data['name']) . "\n";
    $message .= "🎂 *Возраст:* " . htmlspecialchars($data['age']) . " лет\n";
    $message .= "📞 *Телефон:* " . htmlspecialchars($data['phone']) . "\n";
    $message .= "🩺 *Жалобы:* " . htmlspecialchars($data['complaints']) . "\n\n";
    $message .= "⏰ *Время:* " . date('d.m.Y H:i:s');
    
    $url = "https://api.telegram.org/bot$bot_token/sendMessage";
    $post_data = [
        'chat_id' => $chat_id,
        'text' => $message,
        'parse_mode' => 'Markdown'
    ];
    
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => json_encode($post_data),
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_SSL_VERIFYPEER => false,
        CURLOPT_TIMEOUT => 10
    ]);
    
    $response = curl_exec($ch);
    $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($http_code === 200) {
        echo json_encode(['success' => true, 'message' => 'Заявка отправлена в Telegram']);
    } else {
        echo json_encode(['error' => 'Ошибка отправки в Telegram', 'details' => $response]);
    }
} else {
    echo json_encode(['error' => 'Only POST method allowed']);
}
?>