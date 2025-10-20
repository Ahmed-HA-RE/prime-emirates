import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type PaymentStore = {
  payment: string;
  setPayment: (payment: PaymentStore['payment']) => void;
};

const usePaymentStore = create<PaymentStore>()(
  devtools(
    persist(
      (set) => ({
        payment: 'PayPal',
        setPayment: (payment) => set((state) => ({ payment })),
      }),
      { name: 'payment' }
    )
  )
);

export default usePaymentStore;
