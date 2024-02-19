"use client";
import { fetcher } from "@/app/utils/client/fetcher";
import useMutation from "@/app/utils/client/useMutation";
import { Product, User } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect } from "react";
import useSWR from "swr";

interface IParams {
  params: { id: string };
}

interface ProductWithUser extends Product {
  user: User;
}

interface ItemDetailResponse {
  ok: boolean;
  product: ProductWithUser;
  isLike: boolean;
  relatedProduct: Product[];
}

const ProductsDetail = ({ params }: IParams) => {
  const router = useRouter();

  const [mutation, { loading: likeLoading, data: likeData, error: likeError }] =
    useMutation(`/api/products/${params.id}/like`);

  const [dmMutation, { loading: dmLoading, data: dmData }] =
    useMutation(`/api/dm`);

  const onDMClick = useCallback(() => {
    dmMutation({
      id: params.id,
    });
  }, []);
  useEffect(() => {
    if (dmData && dmData.ok) {
      router.push(`/dm/${dmData.room}`);
    }
  }, [dmData, router]);

  const { data, mutate } = useSWR<ItemDetailResponse>(
    params.id ? `/api/products/${params.id}` : null,
    fetcher
  );

  const onLikeClick = () => {
    mutation({});
    if (!data) return;
    mutate({ ...data, isLike: !data.isLike }, false);
  };

  return (
    <div className="px-4 py-10 mb-10">
      <div className="mb-8">
        {data?.product?.image ? (
          <img
            src={`https://imagedelivery.net/H9OXqClZlsbj60bAqD6qiw/${data?.product?.image}/public`}
            className="h-96 w-full bg-gray-300"
          />
        ) : (
          <div className="h-96  w-full bg-gray-300" />
        )}

        <div className="relative flex cursor-pointer py-3 border-b border-t items-center space-x-3">
          {data?.product?.user?.avatar ? (
            <img
              width={48}
              height={48}
              alt=""
              src={`https://imagedelivery.net/H9OXqClZlsbj60bAqD6qiw/${data?.product.user.avatar}/public`}
              className="  w-12 h-12 rounded-full bg-gray-300"
            />
          ) : (
            <div className="  w-12 h-12 rounded-full bg-gray-300" />
          )}

          <div>
            <p className="text-sm font-medium text-gray-700">
              {data?.product?.user?.name}
            </p>
            <p className="text-xs font-medium text-gray-500">
              <Link href={`users/profiles/${data?.product?.user?.id}`}>
                View profile &rarr;
              </Link>
            </p>
          </div>
        </div>
        <div className="mt-8 ">
          <h1 className="text-3xl font-bold text-gray-900">
            {data?.product?.name}
          </h1>
          <span className="text-2xl mt-5 text-gray-700">
            ₩{Number(data?.product?.price).toLocaleString()}원
          </span>
          <p className="text-base my-6 text-gray-700">
            {data?.product?.description}
          </p>
          <div className="flex items-center justify-between space-x-2">
            <button
              onClick={onDMClick}
              className="flex-1 bg-teal-500 text-white py-3 rounded-md font-medium hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              판매자와 대화하기
            </button>
            <button
              onClick={onLikeClick}
              className={`p-3  rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500`}
            >
              <svg
                className={data?.isLike ? `h-6 w-6 fill-teal-500` : `w-6 h-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-500">Similar items</h2>
        <div className="mt-6 grid grid-cols-2 gap-4">
          {data?.relatedProduct?.map((v, i) => (
            <div key={i}>
              {v?.image ? (
                <img
                  src={`https://imagedelivery.net/H9OXqClZlsbj60bAqD6qiw/${v?.image}/public`}
                  className="h-56 w-full bg-gray-300"
                />
              ) : (
                <div className="h-56 w-full bg-gray-300" />
              )}

              <h3 className="text-sm text-gray-700">{v.name}</h3>
              <span className="text-sm font-medium text-gray-500">
                ₩{Number(v.price).toLocaleString()}원
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsDetail;
