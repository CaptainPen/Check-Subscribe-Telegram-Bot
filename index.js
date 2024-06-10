require('dotenv').config();
const {
    Bot,
    GrammyError,
    HttpError
} = require('grammy');
const { hydrate } = require('@grammyjs/hydrate');
const { menuKeyboard } = require('./utils/keyboards');
const { botCommands } = require('./utils/const');

const {
    buttonMenuHandler,
    buttonCheckSubscriptionHandler,
    buttonAccessHandler,
    buttonInfoHandler
} = require('./utils/buttonHandlers');

const bot = new Bot(process.env.BOT_API_KEY);
bot.use(hydrate());

bot.api.setMyCommands(botCommands);

bot.command('start', async (ctx) => {
    await ctx.reply('👋\n' +
        '\n' +
        'Приветствую\\! Я \\- CryptoBot, твой проводник в мир криптовалюты\\.\n' +
        '\n' +
        'Интересуешься криптовалютой и хочешь быть частью нашего сообщества? Тогда я помогу тебе\\.', {
        parse_mode: 'MarkdownV2',
    });
    await ctx.reply('Теперь тебе нужно выбрать действие:', {
        reply_markup: menuKeyboard
    });
    await ctx.answerCallbackQuery();
});

bot.callbackQuery('button-menu', buttonMenuHandler);

bot.callbackQuery('button-access', buttonAccessHandler);

bot.callbackQuery('button-checkSubscription', buttonCheckSubscriptionHandler);

bot.callbackQuery('button-info', buttonInfoHandler);

bot.on('message', async (ctx) => {
    await ctx.deleteMessage(ctx.message_id);
});

bot.catch((err) => {
    const ctx = err.ctx;
    console.log(`Error while handling update ${ctx.update.update_id}:`);
    const e = err.error;

    if (e instanceof GrammyError) {
        console.error('Error in request:', e.description);
    } else if (e instanceof HttpError) {
        console.error('Could not contact  Telegram', e);
    } else {
        console.log('Unknown error', e);
    }
});

bot.start();

console.log('Бот запущен!');