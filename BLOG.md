# SH 프로젝트 일지

- 배운 내용을 복습하며 새로운 프로젝트를 만들어보는 레파지토리입니다.

## 기능

- iron-session을 이용한 serverless 로그인구현

## 1 /header/footer/db세팅, post 커스텀훅

```
model User {
  id        Int      @id @default(autoincrement())
  phone     String?  @unique @db.VarChar(50)
  email     String?  @unique
  name      String
  avatar    String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

- 노마드 강의에서 들은 phone 타입의 문제점은 @db로 해결했음 실제 mysql이랑 똑같이 할 수 있음
- 배웠을땐 처음부터 바로 pscale 연동해서 사용하지만 나는 이미 할당하고있는 DB가있어서 (업그레이드할돈없음) 로컬에 저장해뒀다가 배포할때 플래닛스케일로 올릴예정임

```
import axios from "axios";
import { useState } from "react"

export default  function useMutation(url:string):[(data:any)=>void,{loading:boolean,data:undefined | any,error:undefined | any}]{
    const [loading,setLoading] = useState(false)
    const [data,setData] = useState<undefined | any>()
    const [error,setError] = useState<undefined | any>(false)
    function mutation (data:any){
        setLoading(true);
        axios.post(url,data).then(res=>setData(res.data)).catch((err)=>setError(err)).finally(()=>setLoading(false))
    }
    return [mutation,{loading,data,error}]
```

## 2 로그인기능/upsert,connect Token 모델생성

-----> email # ---> User?

----> Token ---- User #1234

----> #1234 ---> email(nodemailer)

----> #1234 ---> Token있으면 ? 유저로그인 : 회원가입

- npm install --save nodemailer @types/nodemailer
- 노드메일러를 이용해 이메일 인증방식으로 토큰발급

## 3 iron-sessions 1/24

### iron-session

- npm install iron-session@6.3.1
- iron-sessions으로 로그인기능
- 유저가 토큰을 요청하면 암호화된 쿠키는 요청과 함께 전송됨
- 토큰테이블의 토큰은 쿠키를 세션에 저장하자마자 삭제해주기
- 세션 백엔드 구축없이 서버리스세션으로 진행

```
await req.session.save()
await prisma.token.deleteMany({
    where:{
        userId:tokenValid.userId
    }
})
```

## 4 useUser훅만들기 , swr로 로그인 api 전역공유

- swr로 user 인포를 전역으로 공유하였다
- 사실 어플리케이션 단위로 상태관리하는건 보통 api 요청이 많기때문에 굳이 상태관리자를 쓸필요가없음(내생각)
- react-query나 swr 쓰면 되는데 next 만든회사가 swr 회사기 때문에 이번에는 swr로 진행
- swr이 react-query 패키지 1/3크기밖에 안됨 (팀플땐 리액트쿼리썼는데 내가 지금 swr쓰는이유)

```
'use client'
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";


const fetcher = (url:string)=> axios.get(url).then(res=>res.data)

export default function useUser () {
    const { data,error} = useSWR(`/api/users/me`, fetcher)
    const router = useRouter()


    return data
  }
```

## 5 product table생성 1/26

```
model Product {
  id          Int      @id @default(autoincrement())
  user        User     @relation(fields: [userId], references: [id])
  userId      Int
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  image       String   @db.VarChar(255)
  name        String   @db.VarChar(20)
  price       String   @db.VarChar(20)
  description String   @db.VarChar(200)

  @@index([userId])
}
```

## 6 prisma를 이용한 관련상품 로직구현,product model 카테고리항목추가, Like 모델추가(좋아요테이블)

- req.query로 넘어오는 문자열은 +기호로 빠르게 형변환 가능
- split과map함수를 써서 관련단어 배열을 만들고 prisma where or 문을 써서 필터 역할가능
- not을 써서 본상품은 제외하고 연관상품을 보여준다

```
const {id}:any = req.query;

const product = await prisma.product.findUnique({
    where:{
        id:+id,
    },
    include:{
        user:true
    }
})
const terms = product?.name.split(" ").map((v)=>({
    name:{
        contains:v,
    },
}))


const relatedProduct = await prisma.product.findMany({
    where:{
        OR:terms,
        id:{
            not:product?.id
        }
    }
})

console.log(relatedProduct);
```

- 관련상품 링크달아야함

- 좋아요 모델생성
- 좋아요 기능은 optimistic ui update 로 구현한다.
- 인스타같은곳에서 일단 데이터 성공과 관계없이 일단 색부터 바꿔주는거임. 정확도가 떨어지겠지만 빠른속도로 진행해야하고 실패할일이 잘없는 요청에 쓰면 좋을것같음

```
model Like {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  user      User     @relation(fields: [userId], references: [id])
  userId    Int
  product   Product  @relation(fields: [productId], references: [id])
  productId Int

  @@index([productId])
  @@index([userId])
}
```

## 7 optimistic ui update을 이용한 좋아요기능

```
const [mutation,{loading:likeLoading,data:likeData,error:likeError}] = useMutation(`/api/products/${params.id}/like`)
  const {data,mutate} =useSWR<ItemDetailResponse>(params.id ? `/api/products/${params.id}` : null,fetcher)
  const onLikeClick = ()=>{
     mutation({})
  if(!data) return;
  mutate({...data,isLike:!data.isLike},false)
  }
```

- swr의 mutate를 이용해 필요한때에 get요청을 업데이트 할 수 있는데 이때 캐싱된 데이터를 mutate첫번째 argument로 바꿀 수 있다.
- 물론 post요청으로 직접적인 변경도 병행하지만 post 요청이 이뤄지지 않을 시에도 낙관적으로 업데이트해준다.
- 인스타나 소셜미디어의 좋아요 기능처럼 빠르게 진행하고 어찌보면 정확도가 떨어져도 상관없는 기능에 활용가능하다.
<hr/>
- prisma orm의 count 세기

```
 const products = await prisma.product.findMany({
include:{
    _count:{
        select:{
            Like:true
        }
    }
}
    })
```

## 8 optimistic ui update를 통한 커뮤니티 글 공감(좋아요기능+1버튼)

- isWondering이라는 boolean값을 만들어서 데이터 유무를 나타냅니다.
- mutate를 사용해서 캐싱된데이터에서 iswodering의 유무에 따라 +1 -1 을 시킨다

```
 const onWonderClick = ()=>{
  if(!data) return;
  mutate({...data,isWondering:!data.isWondering,post:{...data.post,_count:{...data.post._count,Wondering:data.isWondering ? data?.post._count.Wondering - 1 : data?.post._count.Wondering + 1}}},false)
  wonderMutation({})
 }
```

## 9 커뮤니티 글목록출력완료,댓글기능완료

- includes와 \_count을 다시 한 번 사용해서 기능완료

## USESWR을 이용한 채팅기능

- nextjs의 서버리스 환경에서는 웹소켓을 사용 할 수 없음
- 웹소켓은 서버와 양방향 통신인데 서버가 없기 때문이다.
- 하지만 눈속임으로 실시간 통신이 가능한 방법이 있다.
- mutate를 이용해 post가 성공할때마다 렌더링이 되는 방법

```
  useEffect(() => {
     if (messageData && messageData.ok) {
       mutate();
     }
   }, [messageData]);
```

- useswr훅의 세번째 인자로 {}를 주고 거기에 refreshInterval을 주면 지정한 ms단위로 렌더링가능

```
 const { data, mutate } = useSWR<SWRResponse>(
    `/api/streams/${params.id}`,
    fetcher,
    {
      refreshInterval: 1000,
    }
  );
```

## 가짜데이터 만들기

- seeding 을 이용한 가짜데이터 많이 생성하기
- prisma 폴더에 seeding.ts 파일생성
- client파일 복사후 seed에 똑같이 붙여놓고 하단에 임의의 배열만들기

```
async function main() {
  let arr = new Array(500).fill(5).forEach(async (v) => {
    const stream = await prisma.stream.create({
      data: {
        name: String(v),
        description: String(v),
        price: v,
        user: {
          connect: {
            id: 1,
          },
        },
      },
    });
  });
}

main().catch((e) => console.log(e));
```

- package.json 파일에 아래 추가

```
  "prisma": {
    "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
  }
```

- npx prisma db seed

## prisma 페이지네이션

- 프리즈마는 내장된 기능을 통해 페이지네이션을 참 쉽게 할 수 있다.
- /api/streams?page=1 이런식으로 쿼리스트링을 통해 페이지를 나타낸다
- take로 보여줄 글의 수, skip으로 skip하는 글의수를 조절 할 수 있다
- 프론트페이지는 1페이지부터 시작하므로 프론트페이지에서 -1 한 숫자만큼 스킵수를 곱하면 페이지네이션 끗 !

```
      const stream = await prisma.stream.findMany({
        take: 10,
        skip: 10 * 프론트페이지-1,
      });
```

## 이미지 업로드전 이미지 미리보기 기능

- input 태그생성

```
     <input
                {...register("avatar")}
                id="photo"
                type="file"
                accept="image/*"
                className="hidden"
              />
```

- useform훅의 watch를 사용해서 image변경 의존성배열로 useeffect구성, state에 상태 저장

```
  const avatarChange = watch("avatar");
  const [avatarPreview, setAvatarPreview] = useState("");
    useEffect(() => {
    if (avatarChange && avatarChange.length > 0) {
      const file = avatarChange[0];
      setAvatarPreview(URL.createObjectURL(file));
    }
  }, [avatarChange]);
```

- img 태그에 src로 적용

```
<img
src={avatarPreview}
className="w-14 h-14 rounded-full bg-gray-500 "
/>
```

## cloudflare images 를 이용한 이미지 업로드

- 10만 이미지 전송에 5달러 가격이 합리적임(이미 결제해버림 ㅠㅠ)
- DCU 방식으로 진행 (유저의 브라우저에 접근해 직접 업로드하는 방식)
- - 유저가 서버에 url을 요청하면 서버는 CF한테 URL 을 요청해서 받아서 유저한테 준다.
- - 이 URL은 30분마다 바뀌고 일회성으로 쓰기에 너무 좋음
- - 대역폭에 돈을 내지 않기 위함
- 결제후에 env파일에 세팅함

```
CF_ID = @@@ (Account ID)
CF_TOKEN = @@@ (API Token)
```

- 프론트단

```
const onEditValid = async (ValidData: IEdit) => {
    const { name, email } = ValidData;
    if (avatarChange && avatarChange.length > 0) {
      const { id, uploadURL } = await axios
        .get(`/api/upload`)
        .then((res) => res.data);
      const form = new FormData();
      form.append("file", avatarChange[0], user?.profile?.id + "");
      axios.post(uploadURL, form);

      return;
      mutation({ name, email });
    } else {
      mutation({ name, email });
    }

    setValue("email", "");
    setValue("name", "");
  };
```

- 서버단

```
 if (req.method === "GET") {
      const response = await (
        await fetch(
          `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ID}/images/v2/direct_upload`,
          {
            method: "POST",
            headers: {
              /*        "Content-Type": "application/json", */
              Authorization: `Bearer ${process.env.CF_TOKEN}`,
            },
          }
        )
      ).json();
      console.log(response);

      res.json({
        ok: true,
        ...response.result,
      });
    } //GET
```

## image 태그 사용시 에러해결

```
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { domains: ["imagedelivery.net"] },
};

export default nextConfig;

```

```
// image태그 쓰는법
          <Image
            width={48}
            height={48}
            alt=""
            src={`https://imagedelivery.net/H9OXqClZlsbj60bAqD6qiw/${data?.product.user.avatar}/public`}
            className="w-12 h-12 rounded-full bg-gray-300"
          />
```

## 라이브스트림기능 Cloudflare Stream

- https://developers.cloudflare.com/stream/
- OBS Studio https://obsproject.com/ko
