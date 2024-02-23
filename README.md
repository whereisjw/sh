# 🦛하마마켓

![banner](https://github.com/whereisjw/sh/assets/139869491/7fe8ee2c-3380-4561-b1fc-beada025eccd)

배포링크 : https://sh-snowy.vercel.app
## 프로젝트 소개

- 중고 홈짐을 사고 파는 웹사이트 입니다.
- 이메일로 회원 가입 후 집에 안쓰는 홈짐을 팔 수 있습니다.
- 회원 페이지에서 회원 이미지와 닉네임 추가,변경이 가능합니다.
- 하마마켓 회원들 끼리 소통 할 수 있는 커뮤니티 게시판이 있습니다.

### 기능 목록

- optimistic UI update기능으로 구현한 좋아요,공감 기능
- Tailwind를 기반으로한 반응형 웹구현
- Skeleton-loading을 이용한 사용자 경험 개선
- useSWR훅을 이용한 채팅기능
- iron-session 와 node-mailer를 이용한 이메일 인증 방식의 회원가입, 로그인 기능
- Cloudflare을 이용한 이미지 업로드

### 사용된 기술

 

- FE 프론트엔드

---

![Next.js](https://img.shields.io/badge/next.js-%23000000.svg?style=for-the-badge&logo=next.js&logoColor=white)
![SWR](https://img.shields.io/badge/SWR-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

- BE 백엔드

---

![Next.js](https://img.shields.io/badge/next.js-%23000000.svg?style=for-the-badge&logo=next.js&logoColor=white)
![Iron Session](https://img.shields.io/badge/iron--session-000000?style=for-the-badge)
![NodeMailer](https://img.shields.io/badge/nodemailer-%23039BE5.svg?style=for-the-badge&logo=nodemailer&logoColor=white)
![Cloudflare](https://img.shields.io/badge/cloudflare-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

- DEPLOY 배포

---

![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)
![CloudType](https://img.shields.io/badge/Cloudtype-007ACC?style=for-the-badge)

## 기능화면

실제 프로젝트 화면입니다.(아래 .gif가 있습니다)

### 로그인

| 로그인 | 이메일인증 |
|-------|-------|
|  ![녹화_2024_02_23_17_13_19_550](https://github.com/whereisjw/sh/assets/139869491/0d94166f-cbd3-4084-aeb2-a17773f0f3f7) | ![녹화_2024_02_23_17_14_19_897](https://github.com/whereisjw/sh/assets/139869491/ef2b8ebd-dc46-4d0b-9fad-a31ca0a1ad08) |

- 메일을 입력하면 nodemailer를 통해서 사용자에게 인증번호 메일을 보냅니다.
- 이메일로 온 인증번호를 입력하면 서비스 화면을 이용하실 수 있습니다.

### 마이페이지

| 프로필변경 | 마이페이지 |
|-------|-------|
|![녹화_2024_02_23_17_42_32_270](https://github.com/whereisjw/sh/assets/139869491/1cb33dce-6ec0-4fed-8136-c3d80e0a558a) | ![녹화_2024_02_23_17_44_10_903](https://github.com/whereisjw/sh/assets/139869491/f073a810-ad2a-47f8-825b-16f633b76eb7) |

- 마이페이지에서는 프로필 사진 추가/변경 및 닉네임 변경이 가능합니다.
- 업로드한 이미지는 올린 즉시 미리보기가 가능하며, 업로드시 cloudflare의 저장소에 보관됩니다.
- 또 구매,판매,찜 목록 페이지로 넘어갈 수 있습니다.

### 채팅기능

| DM목록 | 채팅 |
|-------|-------|
|  ![녹화_2024_02_23_18_25_31_122](https://github.com/whereisjw/sh/assets/139869491/0958e710-b7c7-4403-be45-cd7b7b5b769e)| ![녹화_2024_02_23_18_16_13_398](https://github.com/whereisjw/sh/assets/139869491/31832311-22c8-4f23-bcc2-100e282d7a44) |

- dm리스트 페이지에서는 dm의 목록(방목록)을 확인 할 수 있습니다.
- 일반적으로 서버리스 환경에서는 서버와 클라이언트단의 실시간 통신인 웹소켓 기능으로 통신 할 수 없습니다.
- swr의 mutate기능을 통해 post요청이 성공할때마다 새로운 get요청을 불러오는 로직을 통해 채팅기능을 구현했습니다.
