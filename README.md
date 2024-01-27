# SH 프로젝트 일지

# 1일차 /header/footer/db세팅, post 커스텀훅

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

# 2일차 로그인기능/upsert,connect Token 모델생성

-----> email # ---> User?

----> Token ---- User #1234

----> #1234 ---> email(nodemailer)

----> #1234 ---> Token있으면 ? 유저로그인 : 회원가입

- npm install --save nodemailer @types/nodemailer
- 노드메일러를 이용해 이메일 인증방식으로 토큰발급

# 3일차 iron-sessions 1/24

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

# 4일차 useUser훅만들기 , swr로 로그인 api 전역공유

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

# 5일차 product table생성 1/26

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

# 6일차 prisma를 이용한 관련상품 로직구현,product model 카테고리항목추가, Like 모델추가(좋아요테이블)

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
