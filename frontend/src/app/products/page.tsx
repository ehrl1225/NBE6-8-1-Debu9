"use client";
import React, { useEffect, useState } from "react";
import { Product } from "../../lib/type/product";

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
}: {
  product: Product;
  onClose: () => void;
}) => {
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
          <button className="text-white bg-[#005034] rounded-xl py-1 px-8 mt-6">
            장바구니
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

  return (
    <>
      <ProdList products={products} onSelect={setSelectedProd} />
      {selectedProd && (
        <ProdDesc
          product={selectedProd}
          onClose={() => setSelectedProd(null)}
        />
      )}
    </>
  );
}
