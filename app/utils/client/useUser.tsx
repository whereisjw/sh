"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useUser() {
  const { data, error } = useSWR(`/api/users/me`, fetcher);
  const router = useRouter();

  return data;
}
