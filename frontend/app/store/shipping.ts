import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import type { Shipping } from 'type';

type ShippingStore = {
  shipping: Shipping;
  setShipping: (address: ShippingStore['shipping']) => void;
  setClearAddress: () => void;
};

const useShippingStore = create<ShippingStore>()(
  devtools(
    persist(
      (set) => ({
        shipping: { address: '', city: '', country: '', postalCode: '' },
        setShipping: (shipping) => set((state) => ({ shipping })),
        setClearAddress: () =>
          set((state) => ({
            shipping: { address: '', city: '', country: '', postalCode: '' },
          })),
      }),
      { name: 'shipping' }
    )
  )
);

export default useShippingStore;
