# src/styles/

Định nghĩa theme, token, global styles để đồng bộ trải nghiệm UI trên toàn ứng dụng. Kết hợp với NativeWind/Tailwind để vừa dùng utility class vừa có theme type-safe.

## Cấu trúc
```
src/styles/
├── theme.ts          # Object theme (light/dark)
└── globalStyles.ts   # StyleSheet chung, shadow, container...
```

## Theme setup
```ts
export const theme = {
  light: {
    background: '#F7F7F9',
    text: '#1D1D1F',
    primary: '#FF4B3A',
  },
  dark: {
    background: '#0D0D0F',
    text: '#FFFFFF',
    primary: '#FF8A65',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
  },
  radius: {
    sm: 8,
    md: 16,
    lg: 24,
  },
};
```

## Global styles
```ts
import { StyleSheet } from 'react-native';
import { theme } from './theme';

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.light.background,
  },
  shadowSoft: {
    shadowColor: '#00000033',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
});
```

## Tailwind + NativeWind
- `tailwind.config.js` nên map token: `colors: { primary: '#FF4B3A' }`.
- Dùng `className="bg-primary"` trong component, kết hợp StyleSheet khi cần performance.

## Convention
- Không dùng magic color trực tiếp trong component; import từ theme/constants.
- Tạo helper `useTheme()` nếu cần switching light/dark.
- Giữ `globalStyles` nhỏ; hầu hết styling nên qua Tailwind utilities.

## Sử dụng
```tsx
import { globalStyles } from '@/styles/globalStyles';

<View style={globalStyles.container} className="pt-10">
  <Text className="text-2xl font-semibold text-primary">Order Food</Text>
</View>
```

Tổ chức theme rõ ràng giúp dễ dàng đổi thương hiệu (white-label) và đảm bảo accessibility.
