import React from "react";
import StreamDetail from "./StreamDetail";
interface IParams {
  params: { id: string };
}
const page = ({ params }: IParams) => {
  return (
    <div className="py-10  px-4 space-y-4">
      <div className="w-full rounded-md shadow-sm bg-gray-300 aspect-video" />
      <StreamDetail url={params.id} />
      <div className="py-10 pb-16 h-[50vh] overflow-y-scroll px-4 space-y-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gray-400" />
          <div className="w-1/2 text-sm text-gray-700 p-2 border  border-gray-600 rounded-md">
            Hi how much are you selling them for?
          </div>
        </div>
        <div className="flex flex-row-reverse items-center space-x-reverse space-x-2">
          <div className="w-8 h-8 rounded-full bg-gray-400" />
          <div className="w-1/2 text-sm text-gray-700 p-2 border border-gray-600 rounded-md">
            <p>I want ￦20,000</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gray-400" />
          <div className="w-1/2 text-sm text-gray-700 p-2 border  border-gray-600 rounded-md">
            Hi how much are you selling them for?
          </div>
        </div>
        <div className="flex flex-row-reverse items-center space-x-reverse space-x-2">
          <div className="w-8 h-8 rounded-full bg-gray-400" />
          <div className="w-1/2 text-sm text-gray-700 p-2 border border-gray-600 rounded-md">
            <p>I want ￦20,000</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gray-400" />
          <div className="w-1/2 text-sm text-gray-700 p-2 border  border-gray-600 rounded-md">
            Hi how much are you selling them for?
          </div>
        </div>
        <div className="flex flex-row-reverse items-center space-x-reverse space-x-2">
          <div className="w-8 h-8 rounded-full bg-gray-400" />
          <div className="w-1/2 text-sm text-gray-700 p-2 border border-gray-600 rounded-md">
            <p>I want ￦20,000</p>
          </div>
        </div>
      </div>
      <div className="fixed w-full mx-auto max-w-md bottom-0 left-0 right-0 inset-x-0">
        <div className="flex relative items-center">
          <input
            type="text"
            className="shadow-sm rounded-full w-full border-gray-300 pr-12 focus:ring-teal-500 focus:border-teal-500 focus:outline-none"
          />
          <div className="absolute h-full inset-y-0 bottom-2 flex py-1.5 pr-1.5 right-0">
            <span className="flex h-full focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 items-center bg-teal-500 rounded-full px-3  hover:bg-teal-700 cursor-pointer text-sm text-white">
              &rarr;
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
