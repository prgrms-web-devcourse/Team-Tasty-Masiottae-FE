# 맛이어때 Masiottae-FE
## 프로젝트 소개

### 디렉토리 구조
```
📦src
 ┣ 📂components
 ┣ 📂constants
 ┣ 📂hooks 
 ┃ ┣ 📂mutations // react-query 의 useMutation 디렉토리
 ┃ ┣ 📂queries // react-query 의 useQuery 디렉토리
 ┃ ┣ 📜useClickAway.ts // 기타 다른 hooks
 ┃ ┣ 📜useForm.ts
 ┃ ┣ 📜useIntersectionObserver.ts
 ┃ ┗ 📜useRouterLoading.ts
 ┣ 📂interfaces // typescript 사용을 위한 interface
 ┣ 📂lib 
 ┃ ┗ 📂axios
 ┣ 📂recoil
 ┃ ┗ 📜currentUser.ts
 ┣ 📂types // typescript 사용을 위한 types
 ┃ ┗ 📜index.ts
 ┗ 📂utils
```

## 실행 환경 및 방법 
node.js와 npm이 설치되어있어야 합니다. 

```
$node --version
v16.15.0

$npm --version
8.13.2
```

프로젝트 clone 후 서버를 실행합니다. 
```
git clone https://github.com/prgrms-web-devcourse/Team-Tasty-Masiottae-FE.git
cd Team-Tasty-Masiottae-FE
npm install
```
기본 주소는 [http://localhost:3000](http://localhost:3000)으로, 서버 실행 후 해당 주소로 접속하시면 됩니다. 

### 개발 서버 실행 
```bash
npm run dev
# or
yarn dev
```
### 프로덕션 빌드 후 실행
```bash
npx next build
npx next start
```

## 프로젝트 결과물 


## 기술 스택

<table>
<tr>
 <td align="center">언어</td>
 <td>
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=ffffff"/>
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=ffffff"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=ffffff"/>
 </td>
</tr>
<tr>
 <td align="center">IDE</td>
 <td>
    <img src="https://img.shields.io/badge/VisualStudioCode-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white"/>&nbsp </td>
</tr>
<tr>
 <td align="center">상태관리</td>
 <td>
  <img src="https://img.shields.io/badge/ContextAPI-FFCD11?style=for-the-badge&logo=React&logoColor=ffffff"/>&nbsp
 </td>
</tr>
<tr>
 <td align="center">라이브러리</td>
 <td>
  <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=ffffff"/>&nbsp
  <img src="https://img.shields.io/badge/Emotion-DB7093?style=for-the-badge&logo=emotion&logoColor=ffffff"/> &nbsp
  <img src="https://img.shields.io/badge/Axios-8DD6F9?style=for-the-badge"/>...&nbsp </td>
</tr>
<tr>
 <td align="center">프레임워크</td>
 <td>
     <img src="https://img.shields.io/badge/Storybook-FF4785?style=for-the-badge&logo=GitHub&logoColor=white"/>&nbsp
 </td>
</tr>
<tr>
 <td align="center">패키지관리</td>
 <td>
    <img src="https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=GitHub&logoColor=white"/>&nbsp
  </td>
</tr>
<tr>
 <td align="center">Formatter</td>
 <td>
  <img src="https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=ESLint&logoColor=ffffff"/> &nbsp
  <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=Prettier&logoColor=ffffff"/>&nbsp </td>
</tr>
<tr>
 <td align="center">배포</td>
 <td><img src="https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=Netlify&logoColor=ffffff"/>&nbsp </td>
</tr>
<tr>
 <td align="center">협업툴</td>
 <td>
    <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white"/>&nbsp
    <img src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=Slack&logoColor=white"/>&nbsp
    <img src="https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white"/>&nbsp
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white"/>&nbsp
 </td>
</tr>
</table>


## 설치 패키지 
```
  "dependencies": {
    "@emotion/react": "^11.9.3",
    "@emotion/styled": "^11.9.3",
    "@tanstack/react-query": "^4.0.10",
    "axios": "^0.27.2",
    "moment": "^2.29.4",
    "next": "12.2.2",
    "react": "18.2.0",
    "react-cookie": "^4.1.1",
    "react-dom": "18.2.0",
    "react-icons": "^4.4.0",
    "recoil": "^0.7.4",
    "uuid": "^8.3.2"
  },
  "devDependencies": {
    "@types/node": "18.0.6",
    "@types/react": "18.0.15",
    "@types/react-dom": "18.0.6",
    "@types/uuid": "^8.3.4",
    "@typescript-eslint/eslint-plugin": "^5.30.7",
    "@typescript-eslint/parser": "^5.30.7",
    "eslint": "8.20.0",
    "eslint-config-next": "12.2.2",
    "eslint-config-prettier": "^8.5.0",
    "husky": "^8.0.1",
    "lint-staged": "^13.0.3",
    "prettier": "^2.7.1",
    "typescript": "^4.7.4"
  }
```

## 개발 기간
7월 21일 ~ 8월 15일 

## 팀원

|하신영|권내영|이지원|조계진|
|------|------|------|-------|
|팀장|팀원|팀원|팀원|
| <img width="400" alt="하신영" src="https://user-images.githubusercontent.com/75849590/184590304-21ad7bff-3c2e-4d4e-ad8c-9c4b6e6712ca.jpg">| <img width="400" alt="권내영" src="https://user-images.githubusercontent.com/75849590/184590314-3a1462b7-744e-4545-a164-45b2d6538c3b.jpg"> | <img width="400" alt="이지원" src="https://user-images.githubusercontent.com/75849590/184590324-39818449-abfe-4b20-8179-c34626b357ec.jpg"> | <img width="400" alt="조계진" src="https://user-images.githubusercontent.com/75849590/184590329-5db723c6-ad14-4aec-9669-bfa621c70433.png">|


