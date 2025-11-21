# src/types/

Layer định nghĩa type/interface dùng chung. Tách type theo domain giúp IDE gợi ý chính xác và dễ maintain khi backend thay đổi.

## File gợi ý
```
src/types/
├── common.ts    # Type generic: ApiResponse<T>, Paginated<T>
├── auth.ts      # IUser, IAuthTokens, IAuthContext
├── food.ts      # IRestaurant, IMenuItem, ICategory
├── order.ts     # IOrder, IOrderItem, IOrderStatus
└── index.ts     # Re-export cho alias @/types
```

## Convention
- Interface PascalCase + prefix `I` (`IOrder`, `ICartItem`).
- Type union PascalCase (`OrderStatus = 'pending' | 'completed'`).
- Export default hạn chế; ưu tiên named export để tree-shaking.
- Nếu type dùng ngoài domain, đặt ở `common.ts`.

## Ví dụ
```ts
// auth.ts
export interface IUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface IAuthContext {
  user: IUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}
```

## Export pattern
`index.ts` gom lại:
```ts
export * from './auth';
export * from './food';
export * from './order';
export * from './common';
```
→ Import bằng `import { IUser } from '@/types';`.

## Best practices
- Tạo type response API riêng `IAuthResponse` thay vì dùng `any`.
- Với `axios`, dùng generic: `apiClient.get<IOrder[]>('/orders')`.
- Khi backend thay đổi field, chỉ phải update file type tương ứng.

Giữ hệ thống type sạch giúp refactor an toàn và autocomplete chính xác.
