import { BackendHeaderDataType } from "@/app/shared/types/types";
import axios from "axios";
import useSWR from "swr";

const fetcher = () =>
  axios.get("/api/ShoppingCart/header").then((res) => res.data);

export const useGetHeader = () => {
  const { data, error } = useSWR<BackendHeaderDataType>(
    "/api/ShoppingCart/header",
    fetcher
  );

  return { headerData: data, error };
};
