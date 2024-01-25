import List from "./List";
import { Metadata } from "next";





export default function Home() {

  return (
  <>
    <List/>
  </>
  );
}


export const metadata: Metadata = { title:'Home_중고홈짐', description:'중고홈짐 홈페이지입니다.' }

