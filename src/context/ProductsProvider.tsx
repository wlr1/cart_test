import React, { createContext, ReactElement } from "react";
import { Simulate } from "react-dom/test-utils";
import error = Simulate.error;

export type ProductType = {
  sku: string;
  name: string;
  price: number;
};

const initState: ProductType[] = [];

export type useProductsContextType = { products: ProductType[] };

const initContextState: useProductsContextType = { products: [] };

const ProductsContext = createContext<useProductsContextType>(initContextState);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const ProductsProvider = ({ children }: ChildrenType): ReactElement => {
  const [products, setProducts] = React.useState<ProductType[]>(initState);

  //fetching data from json-server
  React.useEffect(() => {
    const fetchProducts = async (): Promise<ProductType[]> => {
      const data = await fetch("https//localhost:3500/products")
        .then((res) => {
          return res.json();
        })
        .catch((error) => {
          if (error instanceof Error) console.log(error.message);
        });
      return data;
    };

    fetchProducts().then((products) => setProducts(products));
  }, []);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
