import { CartItem } from "@/lib/type/cartItem";
import { Product } from "@/lib/type/product";
import { useEffect, useState } from "react";

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]); //장바구니
  const [selectedIds, setSelectedIds] = useState<number[]>([]); //장바구니 목록 중 선택된 상품의 id

  useEffect(() => {
    const stored = localStorage.getItem("cartItems");
    if (stored) {
      const parsed = JSON.parse(stored);
      setCartItems(parsed);
      setSelectedIds(parsed.map((item: CartItem) => item.product.id)); //처음엔 전체 선택
    }
  }, []);

  const addToCart = (product: Product, quantity: number) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.product.id == product.id
    );

    let updatedCart: CartItem[];

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
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
    alert("장바구니에 담겼습니다.");
  };
  //전체 선택
  const isAllSelected =
    cartItems.length > 0 && selectedIds.length === cartItems.length;

  const toggleAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(cartItems.map((item) => item.product.id));
    }
  };

  const selectedItems = cartItems.filter((item) =>
    selectedIds.includes(item.product.id)
  );

  //단일 선택
  const toggleOne = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  // 선택된 항목 삭제
  const removeSelectedItems = () => {
    const filtered = cartItems.filter(
      (item) => !selectedIds.includes(item.product.id)
    ); //선택 항목 걸러냄

    setCartItems(filtered);
    setSelectedIds([]);
  };
  return {
    cartItems,
    selectedIds,
    selectedItems,
    addToCart,
    toggleAll,
    toggleOne,
    removeSelectedItems,
    isAllSelected,
  };
}
