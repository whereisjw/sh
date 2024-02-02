import axios from "axios";
import { useState } from "react";

export default function useMutation(
  url: string
): [
  (data: any) => void,
  { loading: boolean; data: undefined | any; error: undefined | any }
] {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<undefined | any>();
  const [error, setError] = useState<undefined | any>(false);
  function mutation(data: any) {
    setLoading(true);
    axios
      .post(url, data)
      .then((res) => setData(res.data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }
  return [mutation, { loading, data, error }];
}
