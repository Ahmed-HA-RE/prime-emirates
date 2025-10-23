import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { CartItem } from 'type';

type CartStore = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  addToCartBtn: (item: CartItem) => void;
  removeFromCart: (_id: string) => void;
  clearCart: () => void;
};

const useCartStore = create<CartStore>()(
  devtools(
    persist(
      (set) => ({
        cartItems: [],
        addToCart: (item) =>
          set((state) => {
            const existedItem = state.cartItems.find(
              (cartItem) => cartItem._id === item._id
            );

            if (existedItem) {
              const updatedCartItems = state.cartItems.map((cartItem) =>
                cartItem._id === item._id
                  ? {
                      ...cartItem,
                      quantity: item.quantity,
                    }
                  : cartItem
              );
              return { cartItems: updatedCartItems };
            }
            return { cartItems: [...state.cartItems, item] };
          }),

        addToCartBtn: (item) =>
          set((state) => {
            const existedItem = state.cartItems.find(
              (cartItem) => cartItem._id === item._id
            );

            if (existedItem) {
              const updatedCartItems = state.cartItems.map((cartItem) =>
                cartItem._id === item._id
                  ? {
                      ...cartItem,
                      quantity: cartItem.quantity + 1,
                    }
                  : cartItem
              );
              return { cartItems: updatedCartItems };
            }
            return { cartItems: [...state.cartItems, item] };
          }),
        removeFromCart: (_id: string) =>
          set((state) => {
            const filteredItems = state.cartItems.filter(
              (cartItem) => cartItem._id !== _id
            );
            return { cartItems: filteredItems };
          }),
        clearCart: () => set((state) => ({ cartItems: [] })),
      }),

      {
        name: 'prime-emirates-cart',
        partialize: (state) => ({
          cartItems: state.cartItems.map((item) => ({
            _id: item._id,
            name: item.name,
            image: item.image,
            quantity: item.quantity,
            price: item.price,
            countInStock: item.countInStock,
          })),
        }),
      }
    )
  )
);

export default useCartStore;
