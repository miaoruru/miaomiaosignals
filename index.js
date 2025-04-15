require('dotenv').config();
const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Welcome to MiaoMiaoSignalsBot! Use /status BTC or /scan');
});

bot.onText(/\/status (.+)/, async (msg, match) => {
  const chatId = msg.chat.id;
  const coin = match[1].toUpperCase();
  try {
    const res = await axios.get(`https://api.binance.com/api/v3/ticker/price?symbol=${coin}USDT`);
    bot.sendMessage(chatId, `${coin} is currently trading at $${res.data.price}`);
  } catch (err) {
    bot.sendMessage(chatId, `Couldn't fetch status for ${coin}.`);
  }
});