const { Client, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, TextInputBuilder, ModalBuilder, TextInputStyle } = require("discord.js"),
    moment = require("moment-timezone"),
    fetch = require("node-fetch"),
    reload = require("self-reload-json"),
    data = new reload("./data.json"),
    { randomNum, getUserData, getRandomQuiz, getRandomChamps } = require("./utils"),
    { token } = require("./config.json"),
    { quizs } = require("./quiz.json"),
    { champs } = require("./champ.json");

const client = new Client({
    intents: Object.keys(GatewayIntentBits).map(i => parseInt(i)).filter(i => !isNaN(i)),
    presence: {
        activities: [
            {
                name: "온라인"
            }
        ]
    }
});

client.on("ready", () => {
    console.log("Bot is online");
});

// 심심이 api
client.on("messageCreate", async (message) => {
    const args = message.content
    const channelId = message.channel.id

    if (args && channelId == "1038401408581521418" && message.author != "1038024510848389130") {
        const simSimRequest = await fetch("https://wsapi.simsimi.com/190410/talk", {
            headers: {
                'x-api-key': '8912OIGMFO9HI6rmhPDNOz0njMUIv.copzXYpxY5',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify({
                utext: args,
                lang: "ko"
            })
        });

        const simSimData = await simSimRequest.json();

        if (simSimData.status == 200) {
            message.reply({ content: simSimData.atext });
        } else {
            console.log(simSimData);
            message.reply({ content: "오류가 발생했습니다." });
        }
    }
});


// slash command interaction
client.on("interactionCreate", async (interaction) => {
    if (interaction.isCommand()) {
        const options = interaction.options;
        switch (interaction.commandName) {
// 공찾기 command
            case "공찾기":
                await interaction.reply({ content: "공의 위치를 섞는중입니다..." }).then(() => {
                    setTimeout(() => {
                        const compo = new ActionRowBuilder();

                        for (i = 1; i < 4; i++) {
                            compo.addComponents(
                                new ButtonBuilder()
                                    .setStyle(ButtonStyle.Secondary)
                                    .setCustomId(`${i}`)
                                    .setEmoji("🎁")
                            );
                        }
                        interaction.editReply({ content: "상자를 선택하세요!", components: [compo] });
                    }, 3000);
                });
                break;
// 가위바위보 command
            case "가위바위보":
                const userChoice = options.getString("낼것");
                const botChoice = ["r", "p", "s"][randomNum(0, 2)];
                const choices = {
                    "r": "바위",
                    "p": "보",
                    "s": "가위"
                };
                let result = "";
                if (userChoice == botChoice) interaction.reply("무승부입니다.");
                else if (userChoice == "r") {
                    if (botChoice == "s") result = "w";
                    else result = "l";
                }
                else if (userChoice == "p") {
                    if (botChoice == "s") result = "w";
                    else result = "l";
                }
                else {
                    if (botChoice == "p") result = "w";
                    else result = "l";
                };
                interaction.reply({ content: `당신의 ${result == "w" ? "승리" : "패배"}입니다.\n\n당신 : ${choices[userChoice]}\n봇 : ${choices[botChoice]}` });
                break;
// 롤 command
            case "롤":
                const line = ["탑", "정글", "미드", "원딜", "서폿"];
                const linenum = randomNum(0, line.length - 1);
                const champ = getRandomChamps(champs);
                interaction.reply({ content: `오늘은 ${line[linenum]} ${champ} 한판 ㄱㄱ`});
                break;
// 주사위 command
            case "주사위":
                interaction.reply({ content: `주사위 결과는 ${randomNum(1, 6)}입니다.` });
                break;
// 출석체크 command
            case "출석체크":
                const userData = getUserData(data, interaction.user.id);
                const today = moment().tz("Asia/Seoul").format("MMDD");
                if (userData.checked != null || userData.checked == today) {
                    interaction.reply({ content: `당신은 이미 출석체크를 오늘 하셨습니다.\n출석횟수: ${userData.count}회` });
                } else {
                    userData.checked = today;
                    userData.count += 1;
                    data.save();
                    interaction.reply({ content: `출석체크 완료\n당신은 오늘로 ${userData.count}번 출석하셨습니다.` });
                };
                break;
// 퀴즈 command (line 128~160, 174~186)
            case "퀴즈":
                const quiz = getRandomQuiz(quizs);
                const compo = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel("정답 입력")
                            .setStyle(ButtonStyle.Primary)
                            .setCustomId("quiz")
                    );
                interaction.reply({ content: `${quiz.quiz}`, components: [compo] });
                break;
            default:
                interaction.reply({ content: "없는 명령어입니다.", ephemeral: true });
                break;
        }
    } else if (interaction.isButton()) {
        const buttonId = interaction.customId;

        if (buttonId == "quiz") {
            const modalInputText = new ActionRowBuilder()
                .addComponents(
                    new TextInputBuilder()
                        .setLabel("정답은?")
                        .setCustomId("message")
                        .setStyle(TextInputStyle.Paragraph)
                );
            const modal = new ModalBuilder()
                .setTitle(interaction.message.content)
                .setCustomId("answer")
                .addComponents(modalInputText);

            await interaction.showModal(modal);

// 공찾기 command
        } else {
            const ball = randomNum(1, 3);

            if (buttonId == ball) {
                await interaction.message.edit({ content: "공의 위치를 맞추셨습니다!", components: [] });
            } else {
                await interaction.message.edit({ content: `땡!\n공은 ${ball}번째 자리에 있었습니다.`, components: [] });
            }
        }

// 퀴즈 modal part
    } else if (interaction.isModalSubmit()) {
        const formData = interaction.fields.fields;
        const quizData = quizs.find(i => i.quiz == interaction.message.content);
        const answer = formData.find(i => i.customId == "message")?.value ?? "전송된 메세지가 없습니다.";

        if (quizData.answer == answer) {
            await interaction.message.edit({ content: `문제: ${quizData.quiz}\n답변: ${answer}\n정답입니다!`, components: [] });
            await interaction.deferUpdate();
        } else {
            await interaction.message.edit({ content: `문제: ${quizData.quiz}\n답변: ${answer}\n틀렸습니다!\n정답은 > ${quizData.answer} < 입니다!`, components: [] });
            await interaction.deferUpdate();
        }
    }
});

client.login(atob(token));