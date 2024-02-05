import React from "react";
import StreamDetail from "./StreamDetail";
import Stream_Message from "@/app/component/Stream_Message";
import Stream_Form from "@/app/component/Stream_Form";
interface IParams {
  params: { id: string };
}

const page = ({ params }: IParams) => {
  return (
    <div className="py-10  px-4 space-y-4">
      <div className="w-full rounded-md shadow-sm bg-gray-300 aspect-video" />
      <StreamDetail url={params.id} />

      <div className="py-10 pb-16 h-[50vh] overflow-y-scroll px-4 space-y-6">
        <Stream_Message message="hi" />
        <Stream_Message message="hi 22" />
      </div>
      <Stream_Form url={params.id} />
      <div className="fixed w-full mx-auto max-w-md bottom-0 left-0 right-0 inset-x-0"></div>
    </div>
  );
};

export default page;
