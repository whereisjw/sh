import React from "react";
import ProductsDetail from "./ProductsDetail";
interface IParams {
  params: { id: string };
}
const page = ({ params }: IParams) => {
  return (
    <>
      <ProductsDetail params={params} />
    </>
  );
};

export default page;
