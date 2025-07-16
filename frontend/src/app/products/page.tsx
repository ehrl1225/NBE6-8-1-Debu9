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
    description: "파푸아 뉴 기니 하일랜즈는 미디엄 로스팅 되어 다크 로스팅 된 아시아/태평양 지역의 커피보다 더 달콤한 풍미를 강조했습니다. 이 커피는 섬의 서부 고원에서 자라며, 풍부한 화산 토양 사이에서 재배됩니다. 온화한 기후와 떼루아가 컵의 완성도를 높여줍니다. 수확된 체리는 종종 통과하기 어려운 도로를 통해 거리의 울퉁불퉁한 산으로부터 가공을 위해 운반됩니다. 이러한 노력으로 만들어진 커피는 우아하면서도 다채로운 풍미를 가지게 됩니다.  이 커피는 아시아/태평양에서 많이 사용하는 방식인 Wet-hulled 방식이 아닌 수세식으로 가공되었습니다. 그로 인해 다크 로스팅 된 아시아/태평양 커피에 비해 부드럽고 달콤한 풍미를 가지고 있습니다. 하지만 아시아/태평양 커피에서 느낄 수 있는 다채로운 허브의 풍미는 잃지 않았습니다. 묵직한 바디감은 부드럽고 사탕수수와 같은 달콤함으로 변해 더욱 매력적인 커피로 탄생하였습니다. 부드럽고 달콤한 풍미로 다양한 디저트류와 함께 페어링 하면 더욱 맛있는 커피를 즐길 수 있습니다",
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
      ;
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
      <p className="p-20">{product.description}</p>
    </div>
  );
};

export default function page() {
  const [selectedProd, setSelectedProd] = useState<Product | null>(null);
  return (
    <>
      <ProdList products={dummyProducts} onSelect={setSelectedProd} />
      {selectedProd && (
        <ProdDesc
          product={selectedProd}
          onClose={() => setSelectedProd(null)}
        />
      )}
    </>
  );
}
