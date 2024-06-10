const inviteLink = 't.me/BlumCryptoBot/app?startapp=ref_IofPLNpBXe'; // Ссылка для приглашения

const channelName = 'test_piankrat'; // Имя канала (заранее добавить бота и выдать права администратора)

const privateChat = 'https://t.me/+yNXFqoeTAUEyMjBi'; // Ссылка на закрытый чат

// ------------------------------------------------------------------------------------------------------------------

const channel = { name: `@${channelName}`, link: `https://t.me/${channelName}` };

const botCommands = [{
    command: 'start', description: 'Запуск бота',
}];

module.exports = { botCommands, channel, inviteLink, privateChat };