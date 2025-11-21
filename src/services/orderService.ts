import { apiClient } from '@/lib/api-client';
import type { ApiResponse, PaginatedResponse } from '@/types/common';
import type { IOrder } from '@/types/order';

const createOrder = async (order: Pick<IOrder, 'items' | 'restaurant'>) => {
  const { data } = await apiClient.post<ApiResponse<IOrder>>('/orders', order);
  return data.data;
};

const listOrders = async () => {
  const { data } = await apiClient.get<PaginatedResponse<IOrder>>('/orders');
  return data.data;
};

const getOrderStatus = async (orderId: string) => {
  const { data } = await apiClient.get<ApiResponse<IOrder>>(`/orders/${orderId}`);
  return data.data;
};

export const orderService = {
  createOrder,
  listOrders,
  getOrderStatus,
};

