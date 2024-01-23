# SH 프로젝트 일지

# 1일차 /header/footer/db세팅, post 커스텀훅
~~~
model User {
  id        Int      @id @default(autoincrement())
  phone     String?  @unique @db.VarChar(50)
  email     String?  @unique
  name      String
  avatar    String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
~~~
- 노마드 강의에서 들은 phone 타입의 문제점은 @db로 해결했음
- 배웠을땐 처음부터 바로 pscale 연동해서 사용하지만 나는 이미 할당하고있는 DB가있어서 (업그레이드할돈없음) 로컬에 저장해뒀다가 배포할때 플래닛스케일로 올릴예정임

~~~
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
~~~

# 2일차 로그인기능/upsert 

-----> email # ---> User?

----> Token ---- User #1234

----> #1234 ---> email(nodemailer) 

----> #1234 ---> Token있으면 ? 유저로그인 : 회원가입


