import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { Product } from 'type';

type CartItem = Pick<Product, '_id' | 'image' | 'name' | 'price'> & {
  quantity: number;
};

type CartStore = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeToCart: (_id: string) => void;
  itemsPrice: () => number;
  taxPrice: () => number;
  shippingPrice: () => number;
  total: () => number;
};

const useCartStore = create<CartStore>()(
  devtools(
    persist(
      (set, get) => ({
        cartItems: [],
        addToCart: (item) =>
          set((state) => {
            const existedItem = state.cartItems.find(
              (cartItem) => cartItem._id === item._id
            );

            if (existedItem) {
              return {
                cartItems: [
                  ...state.cartItems,
                  {
                    ...existedItem,
                    price: existedItem.price * 2,
                    quantity: existedItem.quantity + 1,
                  },
                ],
              };
            }
            return { cartItems: [...state.cartItems, item] };
          }),
        removeToCart: (_id: string) =>
          set((state) => {
            const filteredItems = state.cartItems.filter(
              (cartItem) => cartItem._id !== _id
            );
            return { cartItems: filteredItems };
          }),

        // Calculate Items price
        itemsPrice: () =>
          get().cartItems.reduce(
            (acc, currItems) => acc + currItems.price * currItems.quantity,
            0
          ),

        // Calculate Shipping price >100 free && <100 10 dhs
        shippingPrice: () => {
          const price = get().itemsPrice();
          return price > 100 ? 0 : 10;
        },

        // Calculate Tax price (5%)
        taxPrice: () => get().itemsPrice() * 0.05,

        // Calculate Total
        total: () =>
          get().itemsPrice() + get().shippingPrice() + get().taxPrice(),
      }),

      { name: 'prime-emirates-cart' }
    )
  )
);

export default useCartStore;
