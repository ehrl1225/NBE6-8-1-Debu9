"use client";
import React, { useEffect, useState } from "react";
import { Product } from "../../lib/type/product";
import { CartItem } from "@/lib/type/cartItem";

const ProdList = ({
  products,
  onSelect,
}: {
  products: Product[];
  onSelect: (prod: Product) => void;
}) => {
  return (
    <>
      <div className="relative">
        <ul className="mt-15 px-25 divide-y divide-gray-300">
          {products.map((prod) => (
            <li
              key={prod.id}
              className="flex gap-8 cursor-pointer hover:opacity-60"
              onClick={() => onSelect(prod)}
            >
              <img src={prod.imageUrl} width={120} height={120} />

              <div className="mt-6">
                <p className="text-sm font-bold">{prod.name}</p>
                <p className="text-sm font-thin">{prod.engName}</p>
                <br />
                <p className="text-xs">{prod.price}원</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const ProdDesc = ({
  product,
  onClose,
  cartItems,
  setCartItems,
  quantity,
  increase,
  decrease,
  setQuantity,
}: {
  product: Product;
  onClose: () => void;
  cartItems: CartItem[];
  setCartItems: (items: CartItem[]) => void;
  quantity: number;
  increase: () => void;
  decrease: () => void;
  setQuantity: (quantity: number) => void;
}) => {
  const addToCart = (product: Product, quantity: number) => {
    const isAlready = cartItems.some((item) => item.product.id === product.id);

    if (isAlready) {
      increase();
    }

    const newItem: CartItem = {
      product,
      quantity: quantity,
    };

    setCartItems([...cartItems, newItem]);
    alert("장바구니에 담겼습니다.");
    setQuantity(1);
  };
  return (
    <div className="absolute top-0 w-[50%] h-full left-[50%] bg-white border-l border-l-gray-300">
      <img
        src="/images/goToBack.png"
        width={30}
        height={30}
        onClick={onClose}
        className="ml-3 mt-3 hover:opacity-50"
      />

      <div className="flex p-10 gap-20">
        <img src={product.imageUrl} width={250} height={250} />
        <div className="mt-15">
          <p className="text-sm font-bold">{product.name}</p>
          <p className="text-sm font-thin">{product.engName}</p>
          <br />
          <p className="text-xs">{product.price}원</p>
          <div className="flex gap-2 mt-3">
            <img onClick={decrease} src="/images/minus.png" />

            {quantity}
            <img onClick={increase} src="/images/plus.png" />
          </div>
          <button
            onClick={() => addToCart(product, quantity)}
            className="cursor-pointer text-white bg-[#005034] rounded-xl py-1 px-8 mt-6"
          >
            장바구니 담기
          </button>
        </div>
      </div>
      <hr className="mt-5 mx-10 border border-gray-300"></hr>
      <p className="p-20">{product.info}</p>
    </div>
  );
};

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProd, setSelectedProd] = useState<Product | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    const fetchProducts = async () => {
      const url = "http://localhost:8080/api/products";
      console.log("fetching from:", url);
      const res = await fetch(url);
      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("cartItems");

    if (stored) {
      setCartItems(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const increase = () => {
    setQuantity(quantity + 1);
  };
  const decrease = () => {
    if (quantity == 1) {
      alert("최소 주문 수량은 1개 입니다.");
      return;
    }
    setQuantity(quantity - 1);
  };

  return (
    <>
      <ProdList products={products} onSelect={setSelectedProd} />
      {selectedProd && (
        <ProdDesc
          product={selectedProd}
          onClose={() => setSelectedProd(null)}
          cartItems={cartItems}
          setCartItems={setCartItems}
          quantity={quantity}
          increase={increase}
          decrease={decrease}
          setQuantity={setQuantity}
        />
      )}
    </>
  );
}
