"use client";
import { CartItem } from "../type/cartItem";
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
    <div className="bg-white p-4 w-1/2">
      <div className="flex items-center gap-2 mb-4">
        <input type="checkbox" checked={isAllChecked} onChange={allCheck} />
        <span className="text-sm">전체 선택</span>
        <button
          onClick={selectedDelete}
          className="cursor-pointer border border-gray-300 text-sm py-1 px-3 rounded-xl"
        >
          선택 삭제
        </button>
      </div>

      <ul className="flex flex-col gap-4">
        {selectedItems.map((item) => (
          <li key={item.product.id} className="flex gap-4 items-start">
            <input
              type="checkbox"
              checked={!!selectedMap[item.product.id]}
              onChange={() => checkboxChange(item.product.id)}
            />
            <img
              src={item.product.imageUrl}
              className="w-24 h-24 object-cover"
            />
            <div>
              <p className="text-sm font-bold">{item.product.name}</p>
              <p className="text-sm text-gray-500">{item.product.engName}</p>
              <p className="text-xs mt-1">
                {item.quantity}개 / {item.product.price * item.quantity}원
              </p>
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
    <div className="bg-white p-4 w-1/2 flex flex-col gap-8">
      <OrderSummary total_price={total_price} />
      <UserInfo total_price={total_price} total_item={total_item} />
    </div>
  );
};

const OrderSummary = ({ total_price }: { total_price: number }) => {
  return (
    <div>
      <p className="text-xl font-semibold">구매 금액</p>
      <p>상품 금액: {total_price}원</p>
      <p>배송비: 무료</p>
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
    <div>
      <p className="text-xl font-semibold">구매자 정보</p>
      <label>이메일</label>
      <input placeholder="email" />
      <label>주소</label>
      <input placeholder="address" />
      <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
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
    <div className="h-screen bg-blue-200 flex gap-8 p-4">
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
