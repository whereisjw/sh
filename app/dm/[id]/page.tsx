import React from "react";
import DMDetail from "./DMDetail";

interface IProps {
  params: {
    id: string;
  };
}
const page = ({ params }: IProps) => {
  return (
    <>
      <DMDetail params={params} />
    </>
  );
};

export default page;
