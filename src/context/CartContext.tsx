import { createContext, useContext, useRef, type ReactNode } from 'react';
import { createStore, type StoreApi } from 'zustand';
import { useStore } from 'zustand';

import { calculateCartTotal } from '@/utils/helpers';
import type { ICartItem } from '@/types';

type CartState = {
  items: ICartItem[];
  total: number;
  addItem: (item: ICartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
};

const createCartStore = () =>
  createStore<CartState>((set) => ({
    items: [],
    total: 0,
    addItem: (item) =>
      set((state) => {
        const existing = state.items.find((current) => current.id === item.id);
        const nextItems = existing
          ? state.items.map((current) =>
              current.id === item.id ? { ...current, quantity: current.quantity + item.quantity } : current,
            )
          : [...state.items, item];
        return {
          items: nextItems,
          total: calculateCartTotal(nextItems),
        };
      }),
    updateQuantity: (id, quantity) =>
      set((state) => {
        const nextItems = state.items.map((item) => (item.id === id ? { ...item, quantity } : item));
        return {
          items: nextItems,
          total: calculateCartTotal(nextItems),
        };
      }),
    removeItem: (id) =>
      set((state) => {
        const nextItems = state.items.filter((item) => item.id !== id);
        return {
          items: nextItems,
          total: calculateCartTotal(nextItems),
        };
      }),
    clearCart: () =>
      set(() => ({
        items: [],
        total: 0,
      })),
  }));

type CartStore = StoreApi<CartState>;

const CartContext = createContext<CartStore | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const storeRef = useRef<CartStore>();
  if (!storeRef.current) {
    storeRef.current = createCartStore();
  }

  return <CartContext.Provider value={storeRef.current}>{children}</CartContext.Provider>;
};

export const useCartContext = <T,>(selector: (state: CartState) => T) => {
  const store = useContext(CartContext);
  if (!store) {
    throw new Error('useCartContext must be used inside CartProvider');
  }
  return useStore(store, selector);
};

