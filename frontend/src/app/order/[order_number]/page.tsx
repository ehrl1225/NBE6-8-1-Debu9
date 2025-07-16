"use client"

import { use, useEffect, useState } from "react";
import { OrderItem } from "../list/page";


interface OrderItem{
    order_id:number,
    product_name:string,
    product_eng_name:string,
    price:number,
    image_url:string
    count:number
};

export default function Page({params}: {params:Promise<{order_number:string}>}){
    const {order_number} = use(params);

    const data = {
        num:1,
        order_number:'111',
        email:"ehrl1225@github.com",
        order_address: "강남 프로그래머스",
        created_date:"2025. 07. 16",
        total_price:1000,
        order_items:[
            {
                order_id: 1,
                dilivery_state: "배송중",
                product_name: "스타버구 블렌드1",
                product_eng_name: "Starbu9 Blend1",
                price: 20000,
                image_url: "/images/starbu9_blend1.png",
                count:1
              },
              {
                order_id: 2,
                dilivery_state: "배송중",
                product_name: "스타버구 블렌드2",
                product_eng_name: "Starbu9 Blend2",
                price: 20000,
                image_url: "/images/starbu9_blend2.png",
                count:1
              },
              {
                order_id: 3,
                dilivery_state: "배송중",
                product_name: "스타버구 블렌드3",
                product_eng_name: "Starbu9 Blend3",
                price: 20000,
                image_url: "/images/starbu9_blend3.png",
                count:1
              },
              {
                order_id: 4,
                dilivery_state: "배송중",
                product_name: "스타버구 블렌드4",
                product_eng_name: "Starbu9 Blend4",
                price: 20000,
                image_url: "/images/starbu9_blend4.png",
                count:1
              },
        ]
        
    };
    
    return (
        <div className="text-black flex justify-center h-[1300]">
            <div>
                <div className="mt-10 py-2">
                    <a className="text-2xl font-bold">주문상세</a>
                </div>
                <div className="mb-10">
                    <a className="font-bold">{data.created_date} 주문</a>
                    <a className="ml-3">주문 번호 : {data.order_number}</a>
                </div>
                <ul className="mb-4">
                    {data.order_items.map((e)=><OrderItem orderItem={e} key={e.order_id}></OrderItem>)}
                </ul>
                <a className="text-xl font-semibold mt-10 block">받는사람 정보</a>
                <hr className="border-1"></hr>
                <table className="w-full">
                    <tbody>
                        <tr className="border-b border-b-gray-300">
                            <td scope="col" className="w-[100]">받는사람</td>
                            <td scope="col">{data.email}</td>
                        </tr>
                        <tr className="border-b border-b-gray-300">
                            <td scope="col">주소</td>
                            <td scope="col">{data.order_address}</td>
                        </tr>
                    </tbody>
                </table>

                <a className="text-xl font-semibold block mt-10">결제 정보</a>
                <hr className="border-1"></hr>
                <div className="w-full flex justify-between">
                    <a className="text-lg font-midium">총 결제 금액</a>
                    <a className="text-xl font-bold">{data.total_price}원</a>
                </div>

            </div>
        </div>
    )
}