import { BackendCartProductsType, BackendSummaryType } from "@/app/shared/types/types";
import axios from "axios";
import useSWR from "swr";


const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const useCart = () => {
  const { data, error, mutate } = useSWR<BackendCartProductsType[]>(
    "/api/ShoppingCart/products",
    fetcher
  );

  const { data: summary, mutate: summaryMutate } = useSWR<BackendSummaryType>(
    "/api/ShoppingCart/baskedsummary",
    fetcher
  );

  const clearCart = async () => {
    try {
      await axios
        .delete("/api/ShoppingCart/products")
        .then((res) => res.data)
        .then(() => {
          summaryMutate();
          mutate();
        });
    } catch (error) {
      console.error("Error clearing cart", error);
    }
  };

  const deleteItem = async (itemId: number, userId: string) => {
    try {
      await axios.delete("/api/ShoppingCart/product", {
        data: {
          ProductId: itemId,
          UserGuid: userId,
        },
      });
      mutate();
      summaryMutate();
    } catch (error) {
      console.error("Error deleting item", error);
    }
  };

  const incrementQuantity = async (itemId: number, userId: string) => {
    try {
      await axios.post("/api/ShoppingCart/quantityinc", {
        ProductId: itemId,
        UserGuid: userId,
      });
      mutate();
      summaryMutate();
    } catch (error) {
      console.error("Error incrementing quantity", error);
    }
  };

  const decrementQuantity = async (itemId: number, userId: string) => {
    try {
      await axios.post("/api/ShoppingCart/quantitydec", {
        ProductId: itemId,
        UserGuid: userId,
      });
      mutate();
      summaryMutate();
    } catch (error) {
      console.error("Error decrementing quantity", error);
    }
  };

  const changeQuantity = async (
    itemId: number,
    userId: string,
    value: number
  ) => {
    try {
      await axios.post("/api/ShoppingCart/changequantity", {
        ProductId: itemId,
        UserGuid: userId,
        Value: value,
      });
      mutate();
      summaryMutate();
    } catch (error) {
      console.error("Error chaging quantity", error);
    }
  };
  return {
    products: data,
    summary,
    error,
    clearCart,
    deleteItem,
    incrementQuantity,
    decrementQuantity,
    changeQuantity,
    mutate,
  };
};
