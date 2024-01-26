"use client";

import {CartIcon, DeleteIcon} from "@/app/shared";
import { useEffect, useState } from "react";
import { useCart, CartProductsType } from "@/app/pages/cart/api/useCart";
import { useAuth } from "@/app/pages/cart/api/useAuth";
import { useGetHeader } from "@/app/widgets/Header/api/useGetHeader";

const Cart = () => {
  const { isAuth } = useAuth();
  const { products, summary, clearCart } = useCart();
  const { headerData } = useGetHeader();

  return (
    <>
      {isAuth  && (
        <div className="p-14">
          <div className="top-20 right-0 w-full rounded-md p-10 bg-slate-100">
            <section className="border-b-1 flex justify-between border-b pb-3">
              <div className="flex gap-x-2 items-center">
                <CartIcon width={20} color="#777777" />
                <span className="rounded-3xl text-white bg-secondary-color text-sm px-2 ">
                  {summary?.TotalProducts}
                </span>
              </div>
              <span>
                Total:&nbsp;
                <span className="text-secondary-color">{summary?.Total}</span>
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

                    {products &&
                      products.map((item) => (
                        <CartItem key={item?.Id} item={item} userId={headerData?.UsedGuid ?? ''} />
                      ))}
                  </tbody>
                </table>
              </section>
            ) : (
              <section className="w-full py-4 whitespace-nowrap justify-center flex pt-6">
                <h2>Нет продуктов</h2>
              </section>
            )}
            {summary?.TotalProducts ? (
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
  const [itemQuantity, setItemQuantity] = useState(item?.Quantity);

  const handleChangeQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemQuantity(parseInt(e.target.value, 10));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.type === "string") return;
    if (e.key === "Enter") {
      console.log(itemQuantity);
      changeQuantity(item?.Id, userId, itemQuantity);
    }
  };

  useEffect(() => {
    setItemQuantity(item?.Quantity);
  }, [item?.Quantity]);

  return (
    <tr>
      <td className="border h-auto max-w-16">
        <img
          src={`data:image/${item.Images[0].FileExtension};base64,${item.Images[0].Image}`}
          alt=""
        />
      </td>
      <td className="pl-3 w-full border whitespace-nowrap pr-3">{item.Name}</td>
      <td className="border min-w-40 justify-center items-center px-2">
        {item.Price}
      </td>

      <td className="text-center px-2 h-full items-center">
        <div className="flex h-full items-center">
          <button
            disabled={item?.Quantity <= 1}
            className={`px-2 bg-slate-300 ${
              item?.Quantity < 2 && "bg-slate-100 cursor-not-allowed"
            }`}
            onClick={() =>
              item?.Quantity > 1 && decrementQuantity(item?.Id, userId)
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
              incrementQuantity(item?.Id, userId);
            }}
          >
            +
          </button>
        </div>
      </td>

      <td>
        <button
          className="flex items-center p-2"
          onClick={() => deleteItem(item.Id, userId)}
        >
          <DeleteIcon width={20} />
        </button>
      </td>
    </tr>
  );
};

export default Cart;
