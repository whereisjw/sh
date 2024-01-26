import React from "react";

const page = () => {
  return (
    <div className="px-4 py-16 ">
      <div>
        <div className="w-full flex items-center justify-center border-2 border-dashed cursor-pointer border-gray-300 hover:border-teal-500  py-6 rounded-md h-48 hover:text-teal-500">
          <label>
            <svg
              className="h-12 w-12"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true">
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <input className="hidden" type="file" />
          </label>
        </div>
      </div>
      <div className="my-5">
        <label className="mb-1 block text-sm font-medium text-gray-500">Price</label>
        <div className="rounded-md flex items-center relative shadow-sm">
          <div className="absolute left-0 pl-3 flex items-center justify-center pointer-events-none">
            <span className="text-gray-500 text-sm">₩</span>
          </div>
          <input
            className="appearance-none pl-7  w-full py-2 border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500 "
            type="text"
            placeholder="0.00"
          />
          <div className="absolute right-0 pr-3 flex items-center pointer-events-none">
            <span className=" text-gray-500">USD</span>
          </div>
        </div>
      </div>
      <div>
        <label  className="mb-1 block text-sm font-medium text-gray-500">Description</label>
        <div>
          <textarea className="resize-none mt-1 shadow-sm w-full focus:ring-2 focus:ring-teal-500 rounded-md border-gray-400 focus:border-teal-500" rows={4} />
        </div>
      </div>
      <button className="mt-4 w-full bg-teal-500 py-4 hover:bg-teal-600 hover:text-white rounded-md">Upload product</button>
    </div>
  );
};

export default page;
