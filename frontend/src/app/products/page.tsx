"use client";
import React, { useState } from "react";

type Product = {
  id: number;
  name: string;
  engName: string;
  price: number;
  imageUrl: string;
  description: string;
};

const dummyProducts: Product[] = [
  {
    id: 1,
    name: "스타버구 블렌드1",
    engName: "Starbu9 Blend1",
    price: 20000,
    imageUrl: "/images/starbu9_blend1.png",
    description: "깊은 향과 풍부한 맛의 블렌드",
  },
  {
    id: 2,
    name: "스타버구 블렌드2",
    engName: "Starbu9 Blend2",
    price: 20000,
    imageUrl: "/images/starbu9_blend2.png",
    description: "밝고 산뜻한 풍미의 블렌드",
  },
  {
    id: 3,
    name: "스타버구 블렌드3",
    engName: "Starbu9 Blend3",
    price: 20000,
    imageUrl: "/images/starbu9_blend3.png",
    description: "어쩌구 저쩌구",
  },
  {
    id: 4,
    name: "스타버구 블렌드4",
    engName: "Starbu9 Blend4",
    price: 20000,
    imageUrl: "/images/starbu9_blend4.png",
    description: "저쩌구 어쩌구",
  },
];

const ProdList = () => {
  const [selectedProd, setSelectedProd] = useState<Product | null>(null);

  return (
    <>
      <div className="relative">
        <ul className="mt-15 px-25 divide-y divide-gray-300">
          {dummyProducts.map((prod) => (
            <li
              key={prod.id}
              className="flex gap-8 cursor-pointer hover:opacity-60"
              onClick={() => setSelectedProd(prod)}
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
        {selectedProd && (
          <div className="absolute top-0 w-[50%] h-full left-[50%] bg-white border-l border-l-gray-300">
            <img
              src="/images/goToBack.png"
              width={30}
              height={30}
              onClick={() => setSelectedProd(null)}
              className="ml-3 hover:opacity-50"
            />

            <div className="flex p-10 gap-20">
              <img src={selectedProd.imageUrl} width={250} height={250} />
              <div className="mt-8">
                <p className="text-sm font-bold">{selectedProd.name}</p>
                <p className="text-sm font-thin">{selectedProd.engName}</p>
                <br />
                <p className="text-xs">{selectedProd.price}원</p>
                <button className="text-white bg-[#005034] rounded-xl py-1 px-8 mt-6">
                  장바구니
                </button>
              </div>
            </div>
            <hr className="mt-5 mx-10 border border-gray-300"></hr>
            <p className="p-20">{selectedProd.description}</p>
          </div>
        )}
      </div>
      ;
    </>
  );
};

export default function page() {
  return <ProdList />;
}
