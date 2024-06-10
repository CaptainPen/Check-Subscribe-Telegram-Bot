const { accessKeyboard, infoKeyboard, menuKeyboard } = require('./keyboards');
const { channel } = require('./const');
const { InlineKeyboard } = require('grammy');

const buttonMenuHandler = async (ctx) => {
    await ctx.callbackQuery.message.editText('Теперь тебе нужно выбрать действие:', {
        reply_markup: menuKeyboard,
        parse_mode: 'MarkdownV2'
    });
    await ctx.answerCallbackQuery();
};

const buttonAccessHandler = async (ctx) => {
    await ctx.callbackQuery.message.editText('Доступ в чат может получить любой подписчик нашего канала:', {
        reply_markup: accessKeyboard
    });
    await ctx.answerCallbackQuery();
};

const buttonInfoHandler = async (ctx) => {
    await ctx.callbackQuery.message.editText('*Информация о боте*\n' +
        '\n' +
        '🤖 CryptoBot \\- Телеграм бот для инвайтов и доступа в закрытый чат\n' +
        '\n' +
        '❗ Отказ от ответственности: Бот предоставляет только информацию и услуги доступа в чат\\. Мы не несем ответственности за содержание или действия пользователей в чате\\. Пожалуйста, соблюдайте правила и нормы поведения\\.\n' +
        '\n' +
        `🔗 Ссылка на основную группу: [Название группы](${channel.link})\n` +
        '\n' +
        '🔒 Закрытый чат: После подписки на основную группу вы получите доступ в закрытый чат\\.\n' +
        '\n' +
        '📧 Контакты: По вопросам обращайтесь: Email: example@example\\.com Телефон: \\+1234567890'
        , {
            reply_markup: infoKeyboard,
            parse_mode: 'MarkdownV2',
            disable_web_page_preview: true
        });
    await ctx.answerCallbackQuery();
};

const buttonCheckSubscriptionHandler = async (ctx) => {
    const userId = ctx.from.id;
    const chatMember = await ctx.api.getChatMember(channel.name, userId);
    if (chatMember.status === 'left') {
        await ctx.api.editMessageText(ctx.chat.id, ctx.update.callback_query.message.message_id, 'Пожалуйста, присоединитесь к каналу для продолжения.', {
            reply_markup: accessKeyboard,
        });
    } else {
        await ctx.api.editMessageText(ctx.chat.id, ctx.update.callback_query.message.message_id, 'Получи ссылку на чат!', {
            reply_markup: new InlineKeyboard().text('⬅️ Назад', 'button-menu'),
        });
    }

    await ctx.answerCallbackQuery();
};

module.exports = {
    buttonMenuHandler,
    buttonCheckSubscriptionHandler,
    buttonAccessHandler,
    buttonInfoHandler
};