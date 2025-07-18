"use client"
import { useEffect, useState } from "react"
import type {components} from "@/lib/backend/apiV1/schema"

type ProductDto = components["schemas"]["ProductDto"]

function safeParseInt(str: string): number {
    const num = parseInt(str, 10);
    return isNaN(num) ? 0 : num;
  }

function Product({product}:{product:ProductDto}){
    const [bean, setBean] = useState<ProductDto>(product);

    return (
        <div className="border rounded my-2 p-2">
            <form>
                <div className="flex">
                    <div>
                        <input type="text" className="border block" value={bean.name} onChange={(e)=>{setBean({...bean, name:e.target.value});}}></input>
                        <input type="text" className="border block mt-3" value={bean.engName} onChange={(e)=>{setBean({...bean, engName:e.target.value})}}></input>
                        <input type="number" className="border block mt-3" value={bean.price} onChange={(e)=>{setBean({...bean, price:safeParseInt(e.target.value)})}}></input>
                        <input type="text" className="border block mt-3" value={bean.imageUrl} onChange={(e)=>{setBean({...bean, imageUrl:e.target.value})}}></input>
                    </div>
                    <img src={bean.imageUrl} className="ml-10 w-[100] h-[100] object-cover"></img>
                </div>

                <textarea className="border block mt-3" rows={10} cols={50} value={bean.info} onChange={(e)=>{setBean({...bean, info:e.target.value})}}></textarea>

            </form>
            <div className="flex justify-between">
                <button className="p-2 cursor-pointer">수정</button>
                <button className="p-2 cursor-pointer">삭제</button>
            </div>
        </div>
    )
}

export default function(){
    const [products, setProducts] = useState<ProductDto[]>([])
    useEffect( ()=> {
        (async () => {
            const url = "http://localhost:8080/api/products";
            const res = await fetch(url);
            const data = await res.json();
            setProducts(data);
        })()

    }, []);
    return (
        <div className="text-black flex justify-center">
            <div>
                {products.map((e)=><Product product={e} key={e.id}></Product>)}
            </div>
        </div>
    )
}