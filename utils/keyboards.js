const { InlineKeyboard } = require('grammy');
const { inviteLink } = require('./const');

const menuKeyboard = new InlineKeyboard()
    .url('🔗 Инвайт Blum', inviteLink).row()
    .text('🔑 Доступ в чат', 'button-access').row()
    .text('📄 Информация о боте', 'button-info').row();

const accessKeyboard = new InlineKeyboard()
    .url('💎 Наш канал', 'https://t.me/test_piankrat').row()
    .text('🔄 Проверить подписку', 'button-checkSubscription').row()
    .text('⬅️ Назад', 'button-menu').row();

const infoKeyboard = new InlineKeyboard().text('⬅️ Назад', 'button-menu');

module.exports = { menuKeyboard, accessKeyboard, infoKeyboard };