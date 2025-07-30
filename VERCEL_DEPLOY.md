# 🚀 Деплой на Vercel - Пошаговая инструкция

## **📋 ЧТО У НАС ЕСТЬ:**
✅ Chat ID группы: `-1002827782723`
✅ Бот токен: `7535946322:AAGpiSvEsyBWama9QC-ydaRAF7Y94yutoc8`
✅ API файл для Vercel готов: `api/send-telegram.js`

---

## **🔥 ПОШАГОВЫЙ ДЕПЛОЙ:**

### **1️⃣ Создай GitHub репозиторий**

1. **Зайди на** https://github.com
2. **Нажми** "New repository" (зеленая кнопка)
3. **Название:** `zubko-dental-website` (или любое другое)
4. **Сделай** Public
5. **Нажми** "Create repository"

### **2️⃣ Загрузи файлы на GitHub**

**СПОСОБ А: Через веб-интерфейс (проще)**
1. **Нажми** "uploading an existing file"
2. **Перетащи эти файлы:**
   - `index.html`
   - `photo_2025-07-30_15-29-55.jpg` (фото врача)
   - Папку `сертификаты/` (со всеми сертификатами)
   - Папку `api/` (с файлом `send-telegram.js`)
3. **Напиши commit message:** "Add dental website"
4. **Нажми** "Commit changes"

**СПОСОБ Б: Через Git (если умеешь)**
```bash
git clone https://github.com/твой-username/zubko-dental-website.git
# Скопируй все файлы в папку
git add .
git commit -m "Add dental website"
git push
```

### **3️⃣ Подключи к Vercel**

1. **Зайди на** https://vercel.com
2. **Войди через GitHub аккаунт**
3. **Нажми** "New Project"
4. **Найди** свой репозиторий `zubko-dental-website`
5. **Нажми** "Import"
6. **Настройки оставь по умолчанию**
7. **Нажми** "Deploy"
8. **Жди 2-3 минуты** - Vercel развернет сайт

### **4️⃣ Получи URL сайта**

После деплоя Vercel покажет:
```
🎉 Your project has been deployed!
https://zubko-dental-website-abc123.vercel.app
```

**Скопируй этот URL!**

### **5️⃣ Обнови код сайта**

1. **В своем GitHub репозитории** открой файл `index.html`
2. **Нажми** "Edit" (карандаш)
3. **Найди строку** (около 1314):
   ```javascript
   fetch('https://твой-проект.vercel.app/api/send-telegram', {
   ```
4. **Замени на свой URL:**
   ```javascript
   fetch('https://zubko-dental-website-abc123.vercel.app/api/send-telegram', {
   ```
5. **Commit changes**

Vercel автоматически обновит сайт за 1-2 минуты!

---

## **🧪 ТЕСТИРОВАНИЕ:**

1. **Открой свой сайт** по Vercel URL
2. **Нажми** "Оставить заявку"
3. **Заполни форму** тестовыми данными
4. **Отправь** заявку
5. **Проверь группу** - должно прийти сообщение! 🎉

---

## **❗ ЕСЛИ НЕ РАБОТАЕТ:**

### **Проблема: CORS ошибка**
- Vercel API настроен правильно, должно работать

### **Проблема: 404 Not Found**
- Проверь что папка `api/` загружена в корень репозитория
- Файл должен быть `api/send-telegram.js`

### **Проблема: Бот не отправляет**
- Проверь что бот администратор в группе
- Chat ID: `-1002827782723` (с минусом!)

---

## **🎯 ИТОГ:**

После выполнения всех шагов:
✅ Сайт работает на Vercel
✅ Заявки приходят в Telegram группу
✅ Все бесплатно!

**Нужна помощь с каким-то шагом?** Пиши - разберем!