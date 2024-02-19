import React from "react";
import StreamPage from "./StreamPage";

interface IParams {
  params: { id: string };
}
const page = ({ params }: IParams) => {
  return (
    <>
      <StreamPage params={params} />
    </>
  );
};

export default page;
