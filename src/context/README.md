# src/context/

Layer React Context cung cấp state toàn cục (Auth, Cart, Theme...). Context được wrap trong provider riêng và dùng thông qua custom hook (`useAuth`, `useCart`).

## Cấu trúc
```
src/context/
├── AuthContext.tsx
├── CartContext.tsx
└── index.ts          # Re-export providers/hook
```

## Pattern tạo context
```tsx
import { createContext, useState, useMemo, ReactNode } from 'react';
import { IUser } from '@/types';

interface AuthContextValue {
  user: IUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const value = useMemo(() => ({ user, loading: !user, login: async () => {}, logout: async () => {} }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
```

## Best practices
- **Tách server state khỏi context**: dữ liệu từ API nên dùng TanStack Query, context chỉ giữ state cần truy cập mọi nơi (user, cart, theme preference).
- **Hook accessor**: mỗi context cần hook tương ứng trong `src/hooks` để handle undefined context.
- **Provider tree**: Tạo `AppProviders` trong `src/context/index.ts` để gom `AuthProvider`, `CartProvider`, `QueryClientProvider`, `GestureHandlerRootView`.

## CartContext ví dụ
```tsx
import create from 'zustand';

interface CartState {
  items: IOrderItem[];
  addItem: (item: IOrderItem) => void;
}

export const useCartStore = create<CartState>(set => ({
  items: [],
  addItem: item => set(state => ({ items: [...state.items, item] })),
}));
```
→ Có thể wrap Store vào Context nếu cần chia sẻ cùng với side-effect (checkout, sync storage).

## Cách thêm context mới
1. Tạo file `ThemeContext.tsx`.
2. Định nghĩa interface value, provider.
3. Export provider + hook.
4. Import provider vào `AppProviders` (trong `_layout.tsx`).

Sử dụng context đúng chỗ giúp tránh prop drilling và giữ global state minh bạch.
