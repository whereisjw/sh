import React from "react";

const page = () => {
  return (
    <div className="py-10 px-4 space-y-4">
      <div className="flex items-center space-x-3">
        <div className="w-14 h-14 rounded-full bg-gray-500 " />
        <label htmlFor="photo" className="cursor-pointer py-2 px-3 border-gray-300 rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-teal-500">
          Change Photo
          <input id="photo" type="file" accept="image/*" className="hidden" />
        </label>
      </div>
      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-500">
          Email address
        </label>
        <input
          type="email"
          className="appearance-none w-full py-2 border-gray-300 rounded-md shadow-sm placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500 "
          required
        />
      </div>

      <div className="space-y-1">
        <label className="text-sm font-medium text-gray-500">전화번호</label>
        <div className="flex rounded-md shadow-sm">
          <span className="text-sm flex items-center justify-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 select-none">
            +82
          </span>
          <input
            className="appearance-none w-full py-2 border-gray-300 rounded-md rounded-l-none shadow-sm placeholder-gray-500 focus:outline-none focus:ring-teal-500 focus:border-teal-500"
            type="number"
            required
          />
        </div>
      </div>
      <button className="mt-6 w-full bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 focus:outline-none">
        프로필 업데이트
      </button>
    </div>
  );
};

export default page;
