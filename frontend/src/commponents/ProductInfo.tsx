import { Product } from "@/lib/type/product";
import { useCart } from "@/hooks/useCart";

const ProductInfo = ({
  product,
  onClose,
  quantity,
  increase,
  decrease,
}: {
  product: Product;
  onClose: () => void;
  quantity: number;
  increase: () => void;
  decrease: () => void;
}) => {
  const { addToCart } = useCart();

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
          <div className="flex gap-2 mt-3">
            <img onClick={decrease} src="/images/minus.png" />

            {quantity}
            <img onClick={increase} src="/images/plus.png" />
          </div>
          <button
            onClick={() => addToCart(product, quantity)}
            className="cursor-pointer text-white bg-[#005034] rounded-xl py-1 px-8 mt-6"
          >
            장바구니 담기
          </button>
        </div>
      </div>
      <hr className="mt-5 mx-10 border border-gray-300"></hr>
      <p className="p-20">{product.info}</p>
    </div>
  );
};

export default ProductInfo;
