# src/data/schema/

Chứa toàn bộ **Zod schema** dùng để validate dữ liệu người dùng và response từ API.

## auth.ts
- `registerSchema`
- `loginSchema`
- `verifyEmailSchema`
- `forgotPasswordSchema`
- `resetPasswordSchema`
- Các type alias (`RegisterData`, `LoginData`, ...)

## Guideline
- Luôn export cả schema lẫn type inference: `export type LoginData = z.infer<typeof loginSchema>;`.
- Message lỗi nên cụ thể và thân thiện người dùng.
- Dùng `.refine` cho logic liên quan nhiều field (ví dụ confirm password).
- Chia file theo domain, import từ `@/data/schema/<domain>` tại hooks/services/forms.

## Example usage
```ts
import { useForm } from '@/hooks/useForm';
import { registerSchema } from '@/data/schema/auth';

const form = useForm(registerSchema, {
  defaultValues: { email: '', password: '', username: '' },
});
```
