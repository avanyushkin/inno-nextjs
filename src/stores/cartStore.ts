import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '@/types/cart';

type CartStore = {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};
const calc = (items: CartItem[]) => ({
  items,
  totalItems: items.reduce((s, { quantity }) => s + quantity, 0),
  totalPrice: items.reduce((s, { price, discountPercentage, quantity }) => s + price * (1 - discountPercentage / 100) * quantity, 0),
});
export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [], totalItems: 0, totalPrice: 0,

      addToCart: (item) => set(({ items }) => {
        const exists = items.find(i => i.id === item.id);
        const updated = exists ?
        items.map(i => i.id === item.id ?
          { ...i, quantity: Math.min(i.quantity + 1, i.stock) } : i) : [...items, { ...item, quantity: 1 }];
        return calc(updated);
      }),
      removeFromCart: (id) => set(({ items }) => calc(items.filter(i => i.id !== id))),
      updateQuantity: (id, qty) => set(({ items }) => qty <= 0 ?
        calc(items.filter(i => i.id !== id)) : calc(items.map(i => i.id === id ?
          { ...i, quantity: Math.min(qty, i.stock) } : i))
      ),
      clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),
    }),
    { name: 'cart-storage' }
  )
);