"use client"
import { useState, useEffect, useRef } from 'react';
import Link from "next/link";

interface OrderItem{
    order_id:number,
    dilivery_state:string,
    product_name:string,
    product_eng_name:string,
    price:number,
    image_url:string
    count:number
};

interface Order{
    num:number,
    order_number:string,
    order_address:string,
    total_price:number,
    total_count:number,
    created_date:string,
    order_items:OrderItem[]
}

export function OrderItem({orderItem}:{orderItem:OrderItem}){
    return (
        <div className='border my-2 rounded-xl flex border-gray-300'>
            <div className='p-2'>
                <a className='font-bold text-xl'>{orderItem.dilivery_state}</a>
                <div className='flex'>
                    <img src={orderItem.image_url} className='w-[100] h-[100] object-cover'></img>
                    <div>
                        <div className='w-[400]'>
                            <a className='text-lg'>{orderItem.product_name}</a>
                        </div>
                        <div className='mt-1'>
                            <a>{orderItem.product_eng_name}</a>
                        </div>
                        <div className='mt-2 flex'>
                            <a className='block'>{orderItem.price.toLocaleString("ko-KR")} 원</a>
                            <a className='block ml-1'>{orderItem.count} 개</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className='border-l border-l-gray-300 ml-3 px-2'>
                <div className='border rounded my-2 border-gray-300'>
                    <a className='text-center block m-1 p-1'>배송 조회</a>
                </div>
                <div className='border rounded my-2 border-gray-300'>
                    <a className='text-center block m-1 p-1'>교환, 반품 신청</a>
                </div>
                <div className='border rounded my-2 border-gray-300'>
                    <a className='text-center block m-1 p-1'>판매자 문의</a>
                </div>
            </div>
        </div>
    )
}

function OrderList({data}:{data:Order}){
    return (
        <div className='p-3 rounded-xl my-3 shadow-[0_0_5px_rgba(0,0,0,0.3)]'>
            <span className='flex justify-between'>
                <a className='block text-xl font-bold'>{data.created_date} 주문</a>
                <a className='text-blue-500 block' href={`/order/${data.order_number}`}>주문 상세 보기&gt;</a>
            </span>
            {data.order_items.map((e)=><OrderItem orderItem={e} key={e.order_id}></OrderItem>)}

        </div>
    )
}

export default function page() {
    const datas:Order[] = [
        {
            num:1,
            order_number:'111',
            total_price: 1000,
            order_address: "강남 프로그래머스",
            total_count:1,
            created_date:"2025. 07. 16",
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
        },
        {
            num:2,
            order_number:'1233',
            total_price: 4000,
            order_address: "내 집",
            total_count: 3,
            created_date:"2025. 07. 15",
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
            ]
        }
    ];
    return (
        <div className='mt-10 text-black'>
            <div className='flex justify-center'>
                <form>
                    <input type='text' className='border p-2' placeholder='이메일 주소를 작성해 주세요.'></input>
                    <button className='border ml-3 rounded p-2'>조회</button>
                </form>
            </div>
            <div className='flex justify-center mt-3'>
                <ul>
                    {datas.map((e)=><OrderList data={e} key={e.num}></OrderList>)}
                </ul>
            </div>
        </div>
    ); 
  }