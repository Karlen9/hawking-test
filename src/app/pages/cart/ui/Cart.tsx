"use client";

import { CartIcon, DeleteIcon } from "@/app/shared";
import { useEffect, useState } from "react";
import { useCart } from "@/app/pages/cart/api/useCart";
import { useAuth } from "@/app/pages/cart/api/useAuth";
import { useGetHeader } from "@/app/widgets/Header/api/useGetHeader";
import { CartProductsType, convertToCamelCase } from "@/app/shared/types/types";

const Cart = () => {
  const { isAuth } = useAuth();
  const { products, summary, clearCart } = useCart();
  const { headerData } = useGetHeader();

  const formattedHeaderData = convertToCamelCase(headerData);
  const formattedSummary = convertToCamelCase(summary);
  const formattedProducts = products && products?.map(convertToCamelCase);

  return (
    <>
      {isAuth && (
        <div className="p-14">
          <div className="top-20 right-0 w-full rounded-md p-10 bg-slate-100">
            <section className="border-b-1 flex justify-between border-b pb-3">
              <div className="flex gap-x-2 items-center">
                <CartIcon width={20} color="#777777" />
                <span className="rounded-3xl text-white bg-secondary-color text-sm px-2 ">
                  {formattedSummary?.totalProducts ?? "N/A"}
                </span>
              </div>
              <span>
                Всего:&nbsp;
                <span className="text-secondary-color">
                  {formattedSummary?.total ?? "N/A"}
                </span>
              </span>
            </section>
            {products?.length ? (
              <section className="pt-4 w-full">
                <table className="w-full">
                  <tbody>
                    <tr>
                      <td className="w-10">Фото</td>
                      <td>Название</td>
                      <td>Цена</td>
                      <td>
                        <span className="flex justify-center">Кол-во</span>
                      </td>
                      <td></td>
                    </tr>

                    {formattedProducts &&
                      formattedProducts.map((item) => (
                        <CartItem
                          key={item?.id}
                          item={item as CartProductsType}
                          userId={formattedHeaderData?.usedGuid ?? ""}
                        />
                      ))}
                  </tbody>
                </table>
              </section>
            ) : (
              <section className="w-full py-4 whitespace-nowrap justify-center flex pt-6">
                <h2>Нет продуктов</h2>
              </section>
            )}
            {formattedSummary?.totalProducts ? (
              <section className="flex w-full justify-end pt-6 ">
                <button
                  className="flex whitespace-nowrap p-4 border rounded-md bg-red-400 text-white font-medium"
                  onClick={clearCart}
                >
                  Удалить все товары
                </button>
              </section>
            ) : null}
          </div>
        </div>
      )}
    </>
  );
};

const CartItem = ({
  item,
  userId,
}: {
  item: CartProductsType;
  userId: string;
}) => {
  const { changeQuantity, deleteItem, incrementQuantity, decrementQuantity } =
    useCart();
  const [itemQuantity, setItemQuantity] = useState(item?.quantity);

  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemQuantity(parseInt(e.target.value, 10));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.type === "string") return;
    if (e.key === "Enter") {
      changeQuantity(item?.id, userId, itemQuantity);
    }
  };

  useEffect(() => {
    setItemQuantity(item?.quantity);
  }, [item?.quantity]);

  return (
    <tr>
      <td className="border h-auto max-w-16">
        <img
          src={`data:image/${item.images[0].fileExtension};base64,${item.images[0].image}`}
          alt=""
        />
      </td>
      <td className="pl-3 w-full border whitespace-nowrap pr-3">{item.name}</td>
      <td className="border min-w-40 justify-center items-center px-2">
        <span>{item.price}</span>
      </td>

      <td className="text-center px-2 h-full items-center">
        <div className="flex h-full items-center">
          <button
            disabled={item?.quantity <= 1}
            className={`px-2 bg-slate-300 ${
              item?.quantity < 2 && "cursor-not-allowed"
            }`}
            onClick={() =>
              item?.quantity > 1 && decrementQuantity(item?.id, userId)
            }
          >
            -
          </button>
          <input
            className="w-10 pl-4 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            onChange={handleChangeQuantity}
            value={itemQuantity}
            onKeyDown={handleKeyDown}
            min={1}
            inputMode="numeric"
            pattern="[0-9]"
            type="number"
          />
          <button
            className="px-2 bg-slate-300"
            onClick={() => {
              incrementQuantity(item?.id, userId);
            }}
          >
            +
          </button>
        </div>
      </td>

      <td>
        <button
          className="flex items-center p-2"
          onClick={() => deleteItem(item.id, userId)}
        >
          <DeleteIcon width={20} />
        </button>
      </td>
    </tr>
  );
};

export default Cart;
