import { EntityID } from './common';

export interface ITag {
  id: EntityID;
  label: string;
}

export interface IMenuItem {
  id: EntityID;
  restaurantId: EntityID;
  name: string;
  description: string;
  price: number;
  image: string;
  tags: ITag[];
  isAvailable: boolean;
}

export interface IRestaurant {
  id: EntityID;
  name: string;
  rating: number;
  deliveryTimeMinutes: number;
  distanceKm: number;
  heroImage: string;
  cuisine?: string;
  address?: string;
  updatedAt?: string;
  menu: IMenuItem[];
}

