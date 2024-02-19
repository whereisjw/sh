import React from "react";
import CommunityDetail from "./CommunityDetail";
interface IParams {
  params: { id: string };
}
const page = ({ params }: IParams) => {
  return (
    <>
      <CommunityDetail params={params} />
    </>
  );
};

export default page;
