# src/constants/

Chứa các giá trị bất biến dùng xuyên suốt ứng dụng: màu sắc, spacing, typography, route name, storage key. Tách constants giúp tránh "magic number" và đồng bộ theme.

## Cấu trúc gợi ý
```
src/constants/
├── colors.ts
├── spacing.ts
├── typography.ts
├── index.ts         # Barrel export
```

Có thể bổ sung `endpoints.ts`, `storage.ts`, `permissions.ts` khi cần.

## Ví dụ
```ts
// colors.ts
export const COLORS = {
  PRIMARY: '#FF4B3A',
  SECONDARY: '#1D1D1F',
  MUTED: '#8E8E93',
  SUCCESS: '#22C55E',
  WARNING: '#F59E0B',
  ERROR: '#EF4444',
  BACKGROUND: '#F7F7F9',
};
```
```ts
// spacing.ts
export const SPACING = {
  XS: 4,
  SM: 8,
  MD: 12,
  LG: 16,
  XL: 24,
  XXL: 32,
};
```

## Convention
- **UPPER_SNAKE_CASE** cho key (PRIMARY_COLOR) hoặc group object (`COLORS.PRIMARY`).
- Tách constants theo domain (ví dụ `ORDER_STATUS = {...}`).
- Export từ `index.ts`: `export * from './colors';` để import nhanh `import { COLORS } from '@/constants';`.

## Cách sử dụng
```ts
import { COLORS, SPACING } from '@/constants';

<View style={{ backgroundColor: COLORS.BACKGROUND, padding: SPACING.LG }} />
```

## Mở rộng
- Khi thêm theme `dark`, hãy tạo `COLORS_DARK` hoặc map theo theme object tại `src/styles/theme.ts`.
- Đối với route name, tạo `ROUTES = { HOME: '(tabs)/index', CART: 'cart' }` tránh hard-code string trong navigation.

Document rõ ràng giúp mọi người biết nên đặt hằng số ở đâu và tái sử dụng đúng chuẩn.
