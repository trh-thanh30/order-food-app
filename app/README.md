# app/ – Expo Router

Thư mục `app/` tuân theo cấu trúc file-based routing của **Expo Router**. Mọi file `.tsx` trong đây tương ứng với một route, trong khi `_layout.tsx` định nghĩa navigation stack/tab tương ứng.

## Cấu trúc hiện tại

```
app/
├── _layout.tsx           # Root Stack + Splash/Navigator config
├── (tabs)/               # Tab navigator
│   ├── _layout.tsx       # Tab layout với icons & linking
│   ├── index.tsx         # Tab Home (Restaurants)
│   └── two.tsx           # Tab Orders
├── modal.tsx             # Modal route (/modal)
├── [...missing].tsx      # 404-like fallback
└── +html.tsx             # Custom HTML entry cho Expo Router web
```

## Pattern chính

- **Layouts phân cấp**: `_layout.tsx` ở root định nghĩa `Stack`. Bên trong `(tabs)` có `_layout.tsx` để cấu hình `Tabs`. Có thể tạo thêm `(auth)` hoặc `(onboarding)` để tách flow.
- **Dynamic routes**: Dùng `[id].tsx` hoặc `[...slug].tsx` để mapping path động. Ví dụ `app/restaurant/[id].tsx` hiển thị chi tiết nhà hàng.
- **Modal routes**: File `modal.tsx` dùng `Stack.Screen` với `presentation: 'modal'` để tạo popup native.

## Ví dụ layout

```tsx
// app/_layout.tsx
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { theme } from '@/styles/theme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: theme.background[colorScheme ?? 'light'] },
      }}
    >
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      <Stack.Screen name="[...missing]" options={{ headerShown: false }} />
    </Stack>
  );
}
```

## Best practices

- Tách biệt screen logic và UI: phần UI nên import component/feature từ `src/components` / `src/features` (nếu có) để tránh phình route file.
- Tuyến đường nên mỏng: chỉ handle navigation + gọi hooks/services đã chuẩn hoá.
- Sử dụng `Link` và `useRouter` từ `expo-router` thay vì `useNavigation` truyền thống.
- Mọi dữ liệu chung (theme, query client, providers) inject ở RootLayout, ví dụ `QueryClientProvider`, `GestureHandlerRootView`, `ThemeProvider`.

## Thêm route mới

1. Tạo file trong `app/` (ví dụ `app/restaurant/[id].tsx`).
2. Import component chính từ `src/components/features/restaurant` hoặc container trong `src/screens` (nếu tạo thêm).
3. Update README (tuỳ chọn) và test bằng `npm run start`.

## Dynamic routing nâng cao

- **Catch-all**: `[...slug].tsx` cho phép mapping `/restaurant/123/menu`. Dùng `const params = useLocalSearchParams<{ slug: string[] }>()`.
- **Route Groups**: Đặt trong `(groupName)` để gom layout. Ví dụ `(auth)` cho `sign-in.tsx`, `sign-up.tsx` với Stack riêng.

Giữ `app/` sạch sẽ sẽ giúp điều hướng rõ ràng và dễ mở rộng cho các flow mới (auth, cart, tracking, v.v.).
