import axios from "axios";

import useSWR from "swr";

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useUser() {
  const { data, error, isLoading } = useSWR(`/api/users/me`, fetcher);

  return { data, isLoading };
}
