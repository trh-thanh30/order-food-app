import { EntityID } from './common';
import { IMenuItem, IRestaurant } from './food';

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'delivering' | 'completed';

export interface ICartItem extends IMenuItem {
  quantity: number;
  notes?: string;
}

export interface IOrder {
  id: EntityID;
  restaurant: IRestaurant;
  items: ICartItem[];
  total: number;
  status: OrderStatus;
  placedAt: string;
}

