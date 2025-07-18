import { CartItem } from "@/lib/type/cartItem";
import { Product } from "@/lib/type/product";
import { useEffect, useState } from "react";

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("cartItems");
    if (stored) {
      setCartItems(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product, quantity: number) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.product.id == product.id
    );

    let updatedCart;

    if (existingItemIndex !== -1) {
      //장바구니 목록에 같은 상품이 존재하면 그 상품의 수량만 더함
      const updatedItem = {
        //수량 변경된 상품
        ...cartItems[existingItemIndex],
        quantity: cartItems[existingItemIndex].quantity + quantity,
      };

      updatedCart = [...cartItems]; //예전 장바구니 목록 저장
      updatedCart[existingItemIndex] = updatedItem;
    } else {
      const newItem: CartItem = {
        product: product,
        quantity: quantity,
      };

      updatedCart = [...cartItems, newItem];
    }

    setCartItems(updatedCart);
    alert("장바구니에 담겼습니다.");
  };

  return { cartItems, setCartItems, addToCart };
}
