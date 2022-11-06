const { REST, Routes, SlashCommandBuilder, PermissionsBitField } = require('discord.js'),
    { token, clientId, guildId } = require("./config.json");

const commands = [
    new SlashCommandBuilder()
        .setName("출석체크")
        .setDescription("출석체크를 진행합니다."),
    new SlashCommandBuilder()
        .setName("주사위")
        .setDescription("주사위를 굴립니다."),
    new SlashCommandBuilder()
        .setName("가위바위보")
        .setDescription("봇과 가위바위보 게임을 진행합니다.")
        .addStringOption(options =>
            options.setName("낼것")
                .setDescription("낼것을 정합니다..")
                .addChoices({ name: "가위", value: "s" }, { name: "바위", value: "r" }, { name: "보", value: "p" })
                .setRequired(true)
        ),
    new SlashCommandBuilder()
        .setName("롤")
        .setDescription("당신에게 적합한 롤 라인과 챔프를 정해줍니다. 책임은 안져요."),
    new SlashCommandBuilder()
        .setName("공찾기")
        .setDescription("컵에서 공찾기 게임을 시작합니다."),
    new SlashCommandBuilder()
        .setName("퀴즈")
        .setDescription("퀴즈게임을 진행합니다. 당신의 센스를 보겠습니다."),
]

const rest = new REST({ version: '10' }).setToken(atob(token));

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        await rest.put(Routes.applicationGuildCommands(atob(clientId), atob(guildId)), { body: commands.map(c => c.toJSON()) });

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();