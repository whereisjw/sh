

# 1일차 /header/footer/db세팅
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