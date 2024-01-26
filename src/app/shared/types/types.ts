export type BackendCartProductsType = {
  Id: number;
  Name: string;
  Description: string;
  Quantity: number;
  Unit: string;
  Currency: string;
  Price: number;
  DiscountedPrice: number;
  Images: [
    {
      FileName: string;
      FileExtension: string;
      Image: string;
    }
  ];
};

export type CartProductsType = {
  id: number;
  name: string;
  description: string;
  quantity: number;
  unit: string;
  currency: string;
  price: number;
  discountedPrice: number;
  images: [
    {
      fileName: string;
      fileExtension: string;
      image: string;
    }
  ];
};

export type BackendSummaryType = {
  TotalProducts: number;
  Discount: number;
  Total: number;
};

export type SummaryType = {
  totalProducts: number;
  discount: number;
  total: number;
};

export type HeaderDataType = {
  logoImg: string;
  usedGuid: string;
  userName: string;
};

export type BackendHeaderDataType = {
  LogoImg: string;
  UsedGuid: string;
  UserName: string;
};

type CamelCase<T> = {
  [K in keyof T as Uncapitalize<Extract<K, string>>]: T[K] extends object
    ? CamelCase<T[K]>
    : T[K];
};

export function convertToCamelCase<T>(obj: T): CamelCase<T> {
  if (typeof obj !== "object" || obj === null) {
    return obj as CamelCase<T>;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => convertToCamelCase(item)) as CamelCase<T>;
  }

  return Object.keys(obj).reduce((camelizedObj, key) => {
    const camelizedKey = (key.charAt(0).toLowerCase() +
      key.slice(1)) as keyof CamelCase<T>;
    //@ts-ignore
    camelizedObj[camelizedKey] = convertToCamelCase(obj[key]);
    return camelizedObj;
  }, {} as CamelCase<T>);
}
