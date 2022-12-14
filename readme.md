[![Run on Ainize](https://ainize.ai/images/run_on_ainize_button.svg)](https://ainize.web.app/redirect?git_repo=https://github.com/Ryanbae94/discord-bot)

# DISCORD BOT for winter internship assignment
---
## 1. 요구사항

+ node.js 16+

## 2. 설명
Slash Command 기능과 널리 알려진 AI 챗봇인 심심이 기능을 구현 했습니다.

- Slash Command: `#커맨드전용` 채널에서 사용 합니다.
    - `/가위바위보`: 봇과 가위바위보 게임을 진행합니다.
    - `/공찾기`: 컵과 공으로 하는 야바위(?) 게임을 진행합니다.
    - `/주사위`: 1~6 까지의 주사위 숫자를 랜덤하게 뽑아줍니다.
    - `/출석체크`: 출석체크를 진행합니다. 출석 현황을 알 수 있습니다.
    - `/퀴즈`: 넌센스 퀴즈를 진행합니다.
    - `/롤`: 리그오브레전드 게임에서 진행할 라인과 챔피언을 골라줍니다.


+ 심심이: `#봇과의대화` 채널에서 사용합니다. 채널의 메시지창에 메시지를 보내면 봇이 그에 맞는 응답을 해줍니다. Demo Api를 사용 중이므로, 약 70회 이상의 대화 세션이 진행될 경우 사용이 중지될 수 있습니다.


## 3. 파일 설명
- `bot.js`: 메인 실행 파일입니다. 각 커맨드들의 동작 조건을 포함합니다.
- `util.js`: 기능 실행에 필요한 부수적인 함수를 포함합니다.
- `interaction.js`: 기능들의 기본 정의를 포함합니다.
- `champ.json`: `/롤` 기능에 필요한 데이터 파일 입니다.
- `data.json`: `/출석체크` 현황이 저장되는 파일 입니다.
- `quiz.json`: `/퀴즈` 기능에 필요한 데이터 파일 입니다.

## 3. 설치
```
npm install
```

## 4. 실행
```
node interaction.js
node bot.js
