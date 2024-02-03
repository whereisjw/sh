"use client";
import React from "react";
import useSWR from "swr";
import { fetcher } from "../utils/client/fetcher";
import { Review, User } from "@prisma/client";
interface reviewWithUser extends Review {
  createBy: User;
}
interface IReviewResponse {
  ok: boolean;
  reviews: reviewWithUser[];
}
const Profile_reviews = () => {
  const { data } = useSWR<IReviewResponse>(`/api/reviews`, fetcher);
  console.log("1", data);

  return (
    <>
      {data?.reviews.map((v) => (
        <div key={v.id} className="mt-12">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full bg-gray-400" />
            <div>
              <h4 className="text-sm font-bold text-gray-900">
                {v.createById}
              </h4>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={
                      v.score >= star
                        ? "h-5 w-5 text-yellow-400 "
                        : "h-5 w-5 text-gray-400 "
                    }
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 text-gray-600 text-sm">
            <p>{v.review}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Profile_reviews;
