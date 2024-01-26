"use client";

import { useGetHeader } from "../api/useGetHeader";
import { CartIcon } from "@/app/shared";
import { useCart } from "../../../pages/cart/api/useCart";
import Link from "next/link";
import { AboutDropdown } from "@/app/widgets";

export const Header = () => {
  const { headerData } = useGetHeader();
  const { summary } = useCart();

  return (
    <nav className="w-full flex justify-between h-20 bg-header-bg px-40 py-3 items-center">
      <ul className="flex gap-x-5 w-full items-center">
        <li className="flex items-center">
          <div className="w-20">
            <img src={`data:image/png;base64,${headerData?.LogoImg}`} alt="" />
          </div>
          Привет,&nbsp;
          <span className="text-secondary-color">
            {headerData?.UserName ?? "user"}
          </span>
        </li>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <AboutDropdown />
        </li>
        <li>
          <button>Favourite</button>
        </li>

        <li>
          <button>Account</button>
        </li>
      </ul>
      <div>
        <Link href="/cart">
          <div className="flex gap-x-1 items-center">
            <CartIcon width={17} color={"#777777"} />
            Cart
            <span className="rounded-3xl text-white bg-secondary-color text-sm px-2 ">
              {summary?.TotalProducts}
            </span>
          </div>
        </Link>
      </div>
    </nav>
  );
};
