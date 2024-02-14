import React from "react";
import DMForm from "./DMForm";
interface IProps {
  params: {
    id: string;
  };
}
const page = ({ params }: IProps) => {
  return (
    <>
      <div className="pt-10  space-y-3  ">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gray-400" />
          <div className="w-1/2 text-sm text-gray-700 p-2 border  border-gray-600 rounded-md">
            메세지내용
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gray-400" />
          <div className="w-1/2 text-sm text-gray-700 p-2 border  border-gray-600 rounded-md">
            메세지내용
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gray-400" />
          <div className="w-1/2 text-sm text-gray-700 p-2 border  border-gray-600 rounded-md">
            메세지내용
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gray-400" />
          <div className="w-1/2 text-sm text-gray-700 p-2 border  border-gray-600 rounded-md">
            메세지내용
          </div>
        </div>
      </div>
      <DMForm url={params.id} />
    </>
  );
};

export default page;
