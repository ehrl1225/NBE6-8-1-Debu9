"use client";
import React, { useEffect, useState } from "react";
import { Product } from "../../lib/type/product";
import ProductList from "@/commponents/ProductList";
import ProductInfo from "@/commponents/ProductInfo";

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]); //상품 목록
  const [selectedProd, setSelectedProd] = useState<Product | null>(null); //상품 상세 내용
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
      <ProductList products={products} onSelect={setSelectedProd} />
      {selectedProd && (
        <ProductInfo
          product={selectedProd}
          onClose={() => setSelectedProd(null)}
          quantity={quantity}
          increase={increase}
          decrease={decrease}
        />
      )}
    </>
  );
}
