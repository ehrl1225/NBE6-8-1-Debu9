import React from "react";

type Product = {
  id: number;
  name: string;
  engName: string;
  price: number;
  imageUrl: string;
};

const dummyProducts: Product[] = [
  {
    id: 1,
    name: "스타버구 블렌드1",
    engName: "Starbu9 Blend1",
    price: 20000,
    imageUrl: "/images/starbu9_blend1.png",
  },
  {
    id: 2,
    name: "스타버구 블렌드2",
    engName: "Starbu9 Blend2",
    price: 20000,
    imageUrl: "/images/starbu9_blend2.png",
  },
  {
    id: 3,
    name: "스타버구 블렌드3",
    engName: "Starbu9 Blend3",
    price: 20000,
    imageUrl: "/images/starbu9_blend3.png",
  },
  {
    id: 4,
    name: "스타버구 블렌드4",
    engName: "Starbu9 Blend4",
    price: 20000,
    imageUrl: "/images/starbu9_blend4.png",
  },
];

const ProdList = () => {
  return (
    <>
      <ul className="mt-15 px-25 divide-y divide-gray-300">
        {dummyProducts.map((prod) => (
          <li key={prod.id} className="flex gap-8">
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
    </>
  );
};

export default function page() {
  return <ProdList />;
}
