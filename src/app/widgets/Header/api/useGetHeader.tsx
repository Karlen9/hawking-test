import axios from "axios";
import useSWR from "swr";

type HeaderDataType = {
  LogoImg: string;
  UsedGuid: string;
  UserName: string;
};

const fetcher = () =>
  axios.get("/api/ShoppingCart/header").then((res) => res.data);

export const useGetHeader = () => {
  const { data, error } = useSWR<HeaderDataType>(
    "/api/ShoppingCart/header",
    fetcher
  );

  return { headerData: data, error };
};
