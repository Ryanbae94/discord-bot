const randomNum = (min, max) => {
    return Math.round(Math.random() * (max - min) + min);
};

const getUserData = (data, userId) => {
    if (!data[userId]) {
        data[userId] = {
            checked: null,
            count: 0
        };
    }
    return data[userId];
};

const getRandomQuiz = (quizs) => {
    const num = randomNum(0, quizs.length - 1);
    return quizs[num];
};

const getRandomChamps = (champs) => {
    const num = randomNum(0, champs.length - 1);
    return champs[num]
};

exports.getRandomChamps = getRandomChamps;
exports.randomNum = randomNum;
exports.getUserData = getUserData;
exports.getRandomQuiz = getRandomQuiz;