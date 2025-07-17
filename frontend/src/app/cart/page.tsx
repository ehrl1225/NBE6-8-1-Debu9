"use client";
import { CartItem } from "../../lib/type/cartItem";
import { useState } from "react";
import { dummyCartItems } from "../data/dummydata";
const ShoppingCart = ({
  selectedItems,
  selectedMap,
  isAllChecked,
  checkboxChange,
  allCheck,
  selectedDelete,
}: {
  selectedItems: CartItem[];
  selectedMap: { [key: number]: boolean };
  isAllChecked: boolean;
  checkboxChange: (id: number) => void;
  allCheck: () => void;
  selectedDelete: () => void;
}) => {
  return (
    <div className="flex flex-col px-20 py-10 bg-white pt-10 w-1/2">
      <div className="flex items-center gap-2 mb-4 border-b border-b-gray-300 pb-3">
        <input type="checkbox" checked={isAllChecked} onChange={allCheck} />
        <span className="text-sm">전체 선택</span>
        <button
          onClick={selectedDelete}
          className="cursor-pointer ml-53 border border-gray-300 text-sm py-1 px-3 rounded-xl"
        >
          선택 삭제
        </button>
      </div>

      <ul className="w-full flex flex-col gap-4">
        {selectedItems.map((item) => (
          <li
            key={item.product.id}
            className="flex w-full gap-4 py-3 items-start"
          >
            <input
              type="checkbox"
              checked={!!selectedMap[item.product.id]}
              onChange={() => checkboxChange(item.product.id)}
            />
            <img
              src={item.product.imageUrl}
              className="w-24 h-24 object-cover"
            />
            <div className="mt-3 w-full">
              <p className="text-sm font-bold">{item.product.name}</p>
              <p className="text-sm text-gray-500">{item.product.engName}</p>
              <p className="text-xs mt-1">
                {item.quantity}개 / {item.product.price * item.quantity}원
              </p>
              <button className="cursor-pointer border border-gray-300 text-sm py-1 px-3 ml-40 rounded-xl">
                옵션 변경
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
const Order = ({
  total_price,
  total_item,
}: {
  total_price: number;
  total_item: number;
}) => {
  return (
    <div className="border-l border-l-gray-300 pt-10 px-20 w-1/2 flex flex-col gap-8">
      <OrderSummary total_price={total_price} />
      <UserInfo total_price={total_price} total_item={total_item} />
    </div>
  );
};

const OrderSummary = ({ total_price }: { total_price: number }) => {
  return (
    <div className="flex flex-col gap-5 border-b border-b-gray-300 pb-5">
      <p className="text-xl font-semibold mb-3">구매 금액</p>
      <p className="text-s font-light">상품 금액: {total_price}원</p>
      <p className="text-s font-light">배송비: 무료배송</p>
    </div>
  );
};

const UserInfo = ({
  total_price,
  total_item,
}: {
  total_price: number;
  total_item: number;
}) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xl font-semibold mb-5">구매자 정보</p>
      <label>이메일</label>
      <input
        placeholder="email"
        className="border border-gray-300 bg-white rounded-lg px-3 py-2
        bg-[url('/images/email.png')] bg-no-repeat bg-[length:20px_20px] bg-[position:15px_center] pl-15"
      />
      <label>주소</label>
      <input
        placeholder="address"
        className="border border-gray-300 bg-white rounded-lg px-3 py-2
        bg-[url('/images/address.png')] bg-no-repeat bg-[length:20px_20px] bg-[position:15px_center] pl-15"
      />
      <button className="mt-10 cursor-pointer mt-4 px-4 py-2 bg-[#005034] text-white rounded">
        {total_price}원 결제하기 ({total_item}개)
      </button>
    </div>
  );
};

export default function Page() {
  const [selectedItems, setSelectedItems] =
    useState<CartItem[]>(dummyCartItems);
  const [selectedMap, setSelectedMap] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [isAllChecked, setIsAllChecked] = useState(false);

  const checkboxChange = (id: number) => {
    setSelectedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const allCheck = () => {
    const newCheckState: { [key: number]: boolean } = {};
    selectedItems.forEach((item) => {
      newCheckState[item.product.id] = !isAllChecked;
    });
    setSelectedMap(newCheckState);
    setIsAllChecked(!isAllChecked);
  };

  const selectedDelete = () => {
    const filtered = selectedItems.filter(
      (item) => !selectedMap[item.product.id]
    );
    setSelectedItems(filtered);

    // 체크 상태도 초기화
    const newMap = { ...selectedMap };
    selectedItems.forEach((item) => {
      if (selectedMap[item.product.id]) {
        delete newMap[item.product.id];
      }
    });
    setSelectedMap(newMap);
    setIsAllChecked(false);
  };

  const total_price = selectedItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const total_item = selectedItems.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <div className="h-screen bg-[#F9F9F2] flex gap-8 p-4">
      <ShoppingCart
        selectedItems={selectedItems}
        selectedMap={selectedMap}
        isAllChecked={isAllChecked}
        checkboxChange={checkboxChange}
        allCheck={allCheck}
        selectedDelete={selectedDelete}
      />
      <Order total_price={total_price} total_item={total_item} />
    </div>
  );
}
