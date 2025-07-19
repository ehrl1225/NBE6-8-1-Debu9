"use client";

import { useEffect, useState } from "react";
import { components } from "@/lib/backend/apiV1/schema";
import { useParams } from "next/navigation";

type OrderItemDto = components["schemas"]["OrderItemDto"];

function getMessage(deliveryState: string): string {
  switch (deliveryState) {
    case "도착 완료": {
      return "고객님이 주문하신 상품이 배송완료 되었습니다.";
    }case ""
  }
  return "";
}

export default function Page() {
  const order_item_number = useParams();

  const [data, setData] = useState<OrderItemDto>();

  useEffect(() => {
    const delevery = async () => {
      const response = await fetch(
        `http://localhost:8080/api/orders/${order_item_number}`
      );
      const data: OrderItemDto = await response.json();
      setData(data);
    };

    delevery();
  }, [order_item_number]);

  return (
    <div className="flex justify-center text-black mt-10">
      <div>
        <p className="text-2xl font-bold">배송조회</p>
        <div className="bg-gray-300 w-[800] border border-gray-400 px-10 py-3 mt-4">
          <div className="flex justify-center">
            <p className="block text-3xl">{data.expectedDeliveryDate}</p>
            <p className="block ml-5 text-3xl">{data.deliveryState}</p>
          </div>
          <p className="block justify-self-center">
            {getMessage(data.deliveryState)}
          </p>
        </div>
        <table className="flex justify-center mt-10">
          <tbody>
            <tr>
              <td className="text-gray-500 w-[100] text-lg">받는사람</td>
              <td className="text-lg">{data.email}</td>
            </tr>
            <tr>
              <td className="text-gray-500 w-[100] text-lg">받는주소</td>
              <td className="text-lg">{data.address}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
