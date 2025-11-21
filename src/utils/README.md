# src/utils/

`utils/` chứa các hàm thuần (pure functions) hỗ trợ format dữ liệu, validate input và helper chung. Không phụ thuộc React/Expo để dễ test. Bộ file chính:
- `validators.ts`: tập trung 15+ schema/helper cho Auth, Order, Payment, Address, Profile.
- `formatters.ts`: format tiền tệ, ngày giờ, số điện thoại, chuỗi.
- `helpers.ts`: helper chung (groupBy, retry, ID generation...).

## Cấu trúc
```
src/utils/
├── validators.ts       # Hàm trợ giúp kết hợp schema
├── formatters.ts       # Format currency, date, phone, strings
├── helpers.ts          # Hàm thuần (groupBy, retry, range...)
└── index.ts            # (tuỳ chọn) Barrel export

src/data/schema/
├── auth.ts             # 5+ schema liên quan auth
├── order.ts            # Order validation (future)
└── ...
```

> Các schema Zod chi tiết đặt tại `src/data/schema/**` để tách khỏi helper thuần.

## Ví dụ Validators
```ts
import { loginSchema } from '@/data/schema/auth';
import type { LoginData } from '@/data/schema/auth';

export const validateLogin = (payload: Partial<LoginData>) => {
  const result = loginSchema.safeParse(payload);
  if (!result.success) {
    return { success: false as const, errors: result.error.format() };
  }
  return { success: true as const, data: result.data };
};
```
Hoặc viết validator thuần:
```ts
export const isPhoneNumber = (value: string) => /^0\\d{9}$/.test(value);
```

## Ví dụ Formatters
```ts
import { format, intlFormatDistance } from 'date-fns';

export const formatCurrency = (value: number, currency = 'VND') =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency }).format(value);

export const formatOrderDate = (date: string | Date) =>
  format(new Date(date), 'dd/MM/yyyy HH:mm');

export const formatTimeAgo = (date: string | Date) =>
  intlFormatDistance(new Date(date), new Date(), { locale: undefined });

export const formatPhone = (value: string) =>
  value.replace(/(\\d{3})(\\d{3})(\\d{4})/, '$1 $2 $3');
```

## Helper Pattern
```ts
export const groupBy = <T, K extends string | number>(items: T[], keyFn: (item: T) => K) =>
  items.reduce<Record<K, T[]>>((acc, item) => {
    const key = keyFn(item);
    acc[key] = acc[key] ? [...acc[key], item] : [item];
    return acc;
  }, {} as Record<K, T[]>);

export const retry = async <T>(fn: () => Promise<T>, maxAttempts = 3) => {
  let lastError: unknown;
  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      await new Promise(resolve => setTimeout(resolve, attempt * 300));
    }
  }
  throw lastError;
};
```

## Best practices
- Hàm phải pure → không mutate input, không truy cập storage/network.
- Có test unit cho logic quan trọng (format currency, validation) trong `__tests__/`.
- Đặt tên mô tả, ví dụ `formatOrderStatusLabel` thay vì `formatStatus`.
- Re-export trong `src/utils/index.ts` (nếu tạo) để import gọn: `import { formatCurrency } from '@/utils';`.
- Với schema-based validation, để schema trong `src/data/schema` và dùng helper trong `utils/validators.ts` để wrap common flow (`safeParse`, convert lỗi).

## Cách sử dụng
```ts
import { formatCurrency, formatPhone } from '@/utils/formatters';
import { validateLogin } from '@/utils/validators';

const price = formatCurrency(cart.total);
const nicePhone = formatPhone('+8488888888');

const result = validateLogin({ email: form.email, password: form.password });
if (!result.success) {
  setError('email', result.errors.email?._errors?.[0] ?? 'Invalid');
}
```

Giữ `utils/` thuần giúp có thể chia sẻ với backend/front-web nếu cần.
