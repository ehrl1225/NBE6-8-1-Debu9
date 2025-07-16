"use client";
import { Product } from "../type/product";
import { dummyCartItems } from "../data/dummydata";

const total_price = dummyCartItems.reduce(
  (sum, item) => sum + item.product.price * item.quantity,
  0
);

const total_item = dummyCartItems.reduce((sum, item) => sum + item.quantity, 0);

const ShoppingCart = () => {
  return (
    <>
      <div className="bg-white">
        <input type="checkbox" />
        <span className="text-sm">전체 선택</span>
        <button className="cursor-pointer border border-gray-300 text-sm py-1 px-3 rounded-xl">
          선택 삭제
        </button>
        <ul>
          {dummyCartItems.map((item) => {
            return (
              <>
                <li key={item.product.id} className="flex gap-10">
                  <input type="checkbox" />
                  <img src={item.product.imageUrl} />
                  <div className="mt-6">
                    <p className="text-sm font-bold">{item.product.name}</p>
                    <p className="text-sm font-thin">{item.product.engName}</p>
                    <br />
                    <p className="text-xs">
                      {item.quantity}개/{item.product.price * item.quantity}원
                    </p>
                    <button className="cursor-pointer border border-gray-300 text-sm py-1 px-3 rounded-xl">
                      수량 수정
                    </button>
                  </div>
                </li>
              </>
            );
          })}
        </ul>
      </div>
    </>
  );
};

const Order = () => {
  return (
    <>
      <div className="fix4w-[40%] left-[60%] px-10 flex flex-col items-center border-l border-l-gray-300">
        <div className="w-full flex flex-col items-start gap-8 border-b border-b-gray-300 pb-8 mt-10">
          <p className="text-2xl">구매 금액</p>
          <div className="flex gap-50">
            <div className="flex flex-col gap-3">
              <p>상품 금액</p>
              <p>배송비</p>
            </div>
            <div className="flex flex-col gap-3 items-end">
              <p>{total_price}</p>
              <p>무료배송</p>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col items-start mt-10">
          <div className="flex flex-col gap-3">
            <p className="text-2xl pb-8">구매자 정보</p>
            <label>이메일</label>
            <input
              placeholder="email"
              className="border border-gray-300 pl-10 p-2 rounded-lg 
              bg-white bg-[url('/images/email.png')] bg-no-repeat bg-[length:18px_18px] bg-[position:10px_center]"
            />
            <label>주소</label>
            <input
              placeholder="address"
              className="border border-gray-300 pl-10 p-2 rounded-lg
              bg-white bg-[url('/images/address.png')] bg-no-repeat bg-[length:18px_18px] bg-[position:10px_center]"
            />
            <button className="p-2 mt-8 px-5 bg-[#005034] text-white rounded-xl">
              {total_price}원 결제하기({total_item}개)
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default function Page() {
  return (
    <>
      <div className="h-full bg-gray-300 flex">
        <ShoppingCart />
        <Order />
      </div>
    </>
  );
}
