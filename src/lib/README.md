# src/lib/

`lib/` chứa các wrapper cho thư viện bên ngoài (Axios client, Notifications, AsyncStorage, QueryClient). Mục tiêu là cô lập cấu hình để khi đổi provider chỉ cần sửa một nơi.

## Cấu trúc hiện tại
```
src/lib/
├── api-client.ts        # Axios instance + interceptors
├── notifications.ts     # expo-notifications setup
├── queryClient.ts       # TanStack Query client cấu hình
└── storage.ts           # AsyncStorage & SecureStore helpers
```

## Axios client
```ts
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';

export const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_BASE_URL,
  timeout: 10000,
});

apiClient.interceptors.request.use(async config => {
  const token = await SecureStore.getItemAsync('order_food_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```
- **Rule**: Không gọi trực tiếp `axios` trong component/service. Luôn import `apiClient` => dễ test + logging.

## AsyncStorage wrapper pattern
```ts
import AsyncStorage from '@react-native-async-storage/async-storage';

const NAMESPACE = 'orderFoodApp';

export const storage = {
  async get<T>(key: string): Promise<T | null> {
    const raw = await AsyncStorage.getItem(`${NAMESPACE}:${key}`);
    return raw ? (JSON.parse(raw) as T) : null;
  },
  set<T>(key: string, value: T) {
    return AsyncStorage.setItem(`${NAMESPACE}:${key}`, JSON.stringify(value));
  },
  remove(key: string) {
    return AsyncStorage.removeItem(`${NAMESPACE}:${key}`);
  },
};
```
- Tất cả key nên khai báo constant trong `src/constants/storage.ts` (nếu thêm).

## Notifications
`notifications.ts` chịu trách nhiệm:
1. Gọi `Notifications.requestPermissionsAsync()`.
2. Tạo channel Android (`order-updates`).
3. Expose helper `scheduleOrderReminder(orderId)`.

## Query Client
```ts
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});
```
Inject client này trong `app/_layout.tsx` để toàn app dùng chung.

## Hướng dẫn sử dụng
```ts
import { apiClient } from '@/lib/api-client';

export const getProfile = () => apiClient.get('/me');
```

Giữ các wrapper nhỏ gọn, có test riêng khi cần, và không import component từ `lib/` để tránh circular dependency.
