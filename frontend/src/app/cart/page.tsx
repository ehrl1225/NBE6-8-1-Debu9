export default function page() {
  return (
    <>
      <div className="flex h-screen bg-[#F9F9F2]">
        <div className="w-[60%] h-full bg-black"></div>
        <div className="w-[40%] left-[60%] p-10 flex flex-col items-center">
          <div className="flex flex-col items-start gap-5">
            <p className="text-2xl">구매 금액</p>
            <div className="flex gap-50">
              <div className="flex flex-col gap-3">
                <p>상품 금액</p>
                <p>배송비</p>
              </div>
              <div className="flex flex-col gap-3 items-end">
                <p>60,000원</p>
                <p>무료배송</p>
              </div>
            </div>
          </div>
          <hr className="border border-red-300" />
          <div>
            <p className="text-2xl">구매자 정보</p>
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
            <button className="p-2 px-5 bg-[#005034] text-white rounded-xl">
              60,000원 결제하기(3개)
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
