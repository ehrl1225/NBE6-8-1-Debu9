import React from "react";

type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
};

const dummyProducts: Product[] = [
  {
    id: 1,
    name: "스타버구 블렌드1",
    price: 20000,
    imageUrl: "/images/starbu9_blend1.png",
  },
  {
    id: 1,
    name: "스타버구 블렌드1",
    price: 20000,
    imageUrl: "/images/starbu9_blend2.png",
  },
  {
    id: 1,
    name: "스타버구 블렌드1",
    price: 20000,
    imageUrl: "/images/starbu9_blend3.png",
  },
  {
    id: 1,
    name: "스타버구 블렌드1",
    price: 20000,
    imageUrl: "/images/starbu9_blend4.png",
  },
];
export default function () {
  return (
    <>
      <ul>
        {dummyProducts.map((prod) => (
          <li key={prod.id}>
            <img src={prod.imageUrl} />
            <br />
            {prod.name}
            <br />
            {prod.price}원
          </li>
        ))}
      </ul>
    </>
  );
}
