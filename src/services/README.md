# src/services/

Services là lớp trung gian giữa UI và API. Chúng gọi `apiClient`, handle error, transform response và trả về dữ liệu sẵn sàng cho component/hook.

## Cấu trúc
```
src/services/
├── authService.ts
├── orderService.ts
└── restaurantService.ts
```

## Ví dụ authService
```ts
import { apiClient } from '@/lib/api-client';
import { storage } from '@/lib/storage';
import { IUser } from '@/types';

export const authService = {
  login: async (email: string, password: string): Promise<IUser> => {
    const { data } = await apiClient.post('/auth/login', { email, password });
    await storage.set('token', data.token);
    return data.user;
  },
  logout: async () => storage.remove('token'),
  profile: () => apiClient.get<IUser>('/me').then(res => res.data),
};
```

## Error handling pattern
- Bọc call trong `try/catch` tại hook hoặc service tuỳ cấp.
- Chuẩn hoá error bằng helper `normalizeApiError(error)` trong `src/utils`.
- Log lỗi quan trọng (Sentry) tại service để tránh lặp.

## Response transformation
Service chịu trách nhiệm map payload thành type nội bộ:
```ts
const mapRestaurant = (payload: ApiRestaurant): IRestaurant => ({
  id: payload.id,
  name: payload.title,
  banner: payload.cover_image,
  rating: payload.review_score,
});
```
`restaurantService.list` sẽ `return data.map(mapRestaurant);`.

## Guideline
- Không import component từ services.
- Mỗi service là object chứa methods; export const.
- Dễ test: mock `apiClient` trong unit test.
- Nếu logic phức tạp, cân nhắc tách `src/services/transformers/`.

## Sử dụng
```ts
import { useMutation } from '@tanstack/react-query';
import { orderService } from '@/services/orderService';

const { mutate: placeOrder } = useMutation(orderService.create);
```

Kiến trúc service rõ ràng giúp UI tập trung hiển thị, còn business rules nằm đúng chỗ.
