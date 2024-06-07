require('dotenv').config();
const {
    Bot,
    GrammyError,
    HttpError,
    InlineKeyboard
} = require('grammy');
const { hydrate } = require('@grammyjs/hydrate');

const bot = new Bot(process.env.BOT_API_KEY);
bot.use(hydrate());

bot.api.setMyCommands([{
    command: 'start', description: 'Запуск бота',
}]);

const menuInlineKeyboard = new InlineKeyboard()
    .url('🔗 Инвайт Blum', 't.me/BlumCryptoBot/app?startapp=ref_IofPLNpBXe').row()
    .text('🔑 Доступ в чат', 'button-access').row()
    .text('📄 Информация о боте', 'button-info').row();

const accessInlineKeyboard = new InlineKeyboard()
    .url('💎 Официальный канал Blum', 'https://t.me/blumcrypto').row()
    .text('🔄 Проверить подписку', 'button-aaa').row()
    .text('⬅️ Назад', 'button-menu').row();

const infoInlineKeyboard = new InlineKeyboard().text('⬅️ Назад', 'button-menu');

bot.command('start', async (ctx) => {
    await ctx.reply('👋 \n Приветствую\\! Интересуешься криптовалютой и хочешь быть частью нашего сообщества? Тогда я помогу тебе, выбери сам что тебя интересует\\.', {
        parse_mode: 'MarkdownV2',
    });
    await ctx.reply('Теперь тебе нужно выбрать действие:', {
        reply_markup: menuInlineKeyboard
    });
    await ctx.answerCallbackQuery();
});

bot.on('message', async (ctx) => {
    await ctx.reply('Надо подумать...');
});

bot.callbackQuery('button-access', async (ctx) => {
    await ctx.callbackQuery.message.editText('Доступ в чат может получить любой подписчик нашего канала:', {
        reply_markup: accessInlineKeyboard
    });
    await ctx.answerCallbackQuery();
});

bot.callbackQuery('button-info', async (ctx) => {
    await ctx.callbackQuery.message.editText('Главная задача бота - предоставление доступа к чатам и каналам. Он не имеет цели оскорбить кого-либо и несет только развлекательный характер, все материалы взяты из открытого доступа в интернете и использованы в допустимых формах. Автор не несет никакой ответственности за переставленный материал. Присутствует мат.', {
        reply_markup: infoInlineKeyboard
    });
    await ctx.answerCallbackQuery();
});

bot.callbackQuery('button-menu', async (ctx) => {
    await ctx.callbackQuery.message.editText('Теперь тебе нужно выбрать действие:', {
        reply_markup: menuInlineKeyboard,
        parse_mode: 'MarkdownV2'
    });
    await ctx.answerCallbackQuery();
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