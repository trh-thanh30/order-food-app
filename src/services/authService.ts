import { apiClient } from '@/lib/api-client';
import type { ApiResponse } from '@/types/common';
import type { IAuthCredentials, IAuthResult } from '@/types';

const login = async (payload: IAuthCredentials) => {
  const { data } = await apiClient.post<ApiResponse<IAuthResult>>('/auth/login', payload);
  return data.data;
};

const logout = async () => {
  await apiClient.post('/auth/logout');
};

const me = async () => {
  const { data } = await apiClient.get<ApiResponse<IAuthResult>>('/auth/me');
  return data.data;
};

export const authService = {
  login,
  logout,
  me,
};
