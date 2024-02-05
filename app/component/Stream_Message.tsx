import React from "react";
import useMutation from "../utils/client/useMutation";
interface IProps {
  message: string;
}
const Stream_Message = ({ message }: IProps) => {
  return (
    <>
      {" "}
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 rounded-full bg-gray-400" />
        <div className="w-1/2 text-sm text-gray-700 p-2 border  border-gray-600 rounded-md">
          {message}
        </div>
      </div>
    </>
  );
};

export default Stream_Message;
