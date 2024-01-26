import dynamic from "next/dynamic";

const DynamicCart = dynamic(() => import("@/app/pages/cart/ui/Cart"));

export default DynamicCart;
