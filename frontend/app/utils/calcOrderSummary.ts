import type { CartItem } from 'type';

export const calculateOrderSummary = (cartItems: CartItem[]) => {
  // Calc Cart Items
  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);

  // Calc Total Price + Shipping
  const shippingPrice = itemsPrice > 100 ? 0 : 10;

  // Calculate Tax price (5%)
  const taxPrice = itemsPrice * 0.05;

  // Calculate Total Price
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  return { itemsPrice, shippingPrice, taxPrice, totalPrice };
};
