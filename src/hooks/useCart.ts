import { useCartContext } from '@/context/CartContext';
import type { ICartItem } from '@/types/order';

export const useCart = () => {
  const items = useCartContext((state) => state.items);
  const total = useCartContext((state) => state.total);
  const addItem = useCartContext((state) => state.addItem);
  const updateQuantity = useCartContext((state) => state.updateQuantity);
  const removeItem = useCartContext((state) => state.removeItem);
  const clearCart = useCartContext((state) => state.clearCart);

  const addMenuItem = (item: Omit<ICartItem, 'quantity'>, quantity = 1) => {
    addItem({ ...item, quantity });
  };

  return {
    items,
    total,
    addItem: addMenuItem,
    updateQuantity,
    removeItem,
    clearCart,
  };
};
