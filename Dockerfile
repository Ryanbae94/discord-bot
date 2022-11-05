# node 16
FROM node:16

# 디렉토리 설정
WORKDIR /project

# 앱 의존성
# json 와일드카드 사용
COPY package*.json ./
RUN npm install

# 소스 추가
COPY . .

# 80포트
EXPOSE 80

# 명령어
CMD [ "node", "bot.js" ]