

function getMessage(delivery_state:string):string{
    switch(delivery_state){
        case "도착 완료":{
            return "고객님이 주문하신 상품이 배송완료 되었습니다.";
        }
    }
    return "";
}

export default function Page({params}: {params:Promise<{order_item_number:string}>}){
    const data = {
        "expected_delivery_date":"2/14",
        "delivery_state":'도착 완료',
        "email":"aaa@aa.com",
        "address":"경기도 ..."
    }
    return (
        <div className="flex justify-center text-black mt-10">
            <div>
                <p className="text-2xl font-bold">배송조회</p>
                <div className="bg-gray-300 w-[800] border border-gray-400 px-10 py-3 mt-4">
                    <div className="flex justify-center">
                        <p className="block text-3xl">{data.expected_delivery_date}</p>
                        <p className="block ml-5 text-3xl">{data.delivery_state}</p>

                    </div>
                    <p className="block justify-self-center">{getMessage(data.delivery_state)}</p>
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
    )
}