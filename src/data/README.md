# src/data/

Chứa các nguồn dữ liệu tĩnh hoặc schema mô tả contract với backend. Hiện tại tập trung vào **Zod schema** giúp validate form & API response trước khi cập nhật state.

## Cấu trúc
```
src/data/
└── schema/
    ├── auth.ts        # Schema & type cho flows Auth (login, register...)
    └── README.md?     # (tuỳ chọn) mô tả chi tiết nếu mở rộng
```

## auth.ts
```ts
import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().min(3, { error: 'Username must be at least 3 characters' }).nonempty({
    error: 'Username is required',
  }),
  email: z.string().nonempty({ error: 'Email is required' }).email({ error: 'Invalid email address' }),
  password: z.string().min(6, { error: 'Password must be at least 6 characters' }).nonempty({
    error: 'Password is required',
  }),
});
```

## Naming convention
- File theo domain: `auth.ts`, `order.ts`, `payment.ts`.
- Export schema + type alias `type LoginData = z.infer<typeof loginSchema>;`.
- Không import component hoặc hook vào schema để tránh circular dependency.

## Cách sử dụng với hooks
```ts
import { useForm } from '@/hooks/useForm';
import { loginSchema, LoginData } from '@/data/schema/auth';

export const useLoginForm = () => {
  const form = useForm<LoginData>(loginSchema);
  return { ...form };
};
```

Khi backend đổi contract, chỉ cần cập nhật schema tương ứng → giúp form + service được type-safe ngay lập tức.
