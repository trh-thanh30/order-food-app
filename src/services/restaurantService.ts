import { apiClient } from '@/lib/api-client';
import type { PaginatedResponse } from '@/types/common';
import type { IMenuItem, IRestaurant } from '@/types/food';

const listRestaurants = async () => {
  const { data } = await apiClient.get<PaginatedResponse<IRestaurant>>('/restaurants');
  return data.data;
};

const getRestaurant = async (restaurantId: string) => {
  const { data } = await apiClient.get<IRestaurant>(`/restaurants/${restaurantId}`);
  return data;
};

const getMenuItems = async (restaurantId: string) => {
  const { data } = await apiClient.get<PaginatedResponse<IMenuItem>>(
    `/restaurants/${restaurantId}/menu`,
  );
  return data.data;
};

export const restaurantService = {
  listRestaurants,
  getRestaurant,
  getMenuItems,
};

