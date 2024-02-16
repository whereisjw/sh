import Link from "next/link";
import React from "react";
import Profile_cash from "../component/Profile_cash";

import Profile from "../component/Profile";
import Profile_reviews from "../component/Profile_reviews";
import Profile_upload from "../component/Profile_upload";

const page = () => {
  return (
    <div className="py-10 px-4">
      <Profile />
      <Profile_cash />
      <Profile_upload />
    </div>
  );
};

export default page;
