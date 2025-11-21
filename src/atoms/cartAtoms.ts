import { atom } from 'jotai';
import type { ICartItem } from '@/types';

export const cartItemsAtom = atom<ICartItem[]>([]);

export const cartTotalQuantityAtom = atom(get =>
  get(cartItemsAtom).reduce((total, item) => total + item.quantity, 0),
);

export const cartSubtotalAtom = atom(get =>
  get(cartItemsAtom).reduce((total, item) => total + item.quantity * item.price, 0),
);

export const addToCartAtom = atom(
  null,
  (get, set, newItem: ICartItem) => {
    const items = get(cartItemsAtom);
    const existingIndex = items.findIndex(item => item.id === newItem.id);
    if (existingIndex !== -1) {
      const updated = [...items];
      updated[existingIndex] = {
        ...updated[existingIndex],
        quantity: updated[existingIndex].quantity + newItem.quantity,
      };
      set(cartItemsAtom, updated);
    } else {
      set(cartItemsAtom, [...items, newItem]);
    }
  },
);

export const removeFromCartAtom = atom(
  null,
  (get, set, id: string) => {
    const items = get(cartItemsAtom).filter(item => item.id !== id);
    set(cartItemsAtom, items);
  },
);

export const resetCartAtom = atom(null, (_get, set) => {
  set(cartItemsAtom, []);
});
