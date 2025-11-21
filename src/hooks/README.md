# src/hooks/

Các custom hook giúp tái sử dụng logic stateful trên toàn ứng dụng. Mỗi hook nên tập trung vào một trách nhiệm và luôn bắt đầu bằng `use` để React có thể track.

## Cấu trúc khuyến nghị

```
src/hooks/
├── useAuth.ts        # Wrap Jotai/Context cho auth
├── useCart.ts        # Truy cập cart atoms + helpers
├── useFetch.ts       # Wrapper TanStack Query
├── useForm.ts        # Hợp nhất React Hook Form + Zod
├── useDebouncedValue.ts # Ví dụ hook tiện ích
└── index.ts          # Barrel export
```

## Hook catalog
- `useAuth` – kết hợp `AuthContext` + `userAtom` để đọc/ghi user, expose helpers như `login`, `logout`.
- `useCart` – thao tác cart qua `useAtom` (add/remove/reset) + tính subtotal.
- `useFetch` – ánh xạ `useQuery` của `@react-query/native` sang API object (đã cài đặt sẵn trong repo).
- `useForm` – tạo form chuẩn `useFormBase` với `zodResolver`, sử dụng schema ở `src/data/schema`.
- `usehooks-ts` – tận dụng các hook tiện ích (`useAsync`, `useLocalStorage`, `useToggle`, `useDebounce`, `usePrevious`, `useWindowSize`, `useCounter`, `useTimeout`, `useInterval`) để giảm boilerplate.

## Ví dụ: `useForm`

```ts
import { useForm as useRHForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { ZodSchema, TypeOf } from 'zod';

export const useForm = <TSchema extends ZodSchema>(
  schema: TSchema,
  options?: Parameters<typeof useRHForm<TypeOf<TSchema>>>[0],
) =>
  useRHForm<TypeOf<TSchema>>({
    resolver: zodResolver(schema),
    mode: 'onBlur',
    ...options,
  });
```

## Example: hook composition

```ts
import { useAtomValue, useSetAtom } from 'jotai';
import { userAtom, hydrateUserAtom } from '@/atoms';
import { useFetch } from '@/hooks/useFetch';
import { useDebounce } from 'usehooks-ts';

export const useRestaurants = () => {
  const user = useAtomValue(userAtom);
  const hydrateUser = useSetAtom(hydrateUserAtom);
  const { data, isFetching, refetch } = useFetch(['restaurants'], () => restaurantService.list(), {
    enabled: Boolean(user),
  });

  const debouncedRefetch = useDebounce(refetch, 300);

  useEffect(() => {
    hydrateUser();
  }, [hydrateUser]);

  return { restaurants: data ?? [], isFetching, refresh: debouncedRefetch };
};
```

## Convention

- **Naming**: camelCase với prefix `use`.
- **Scope rõ ràng**: hook phải tập trung một trách nhiệm (fetch, form, storage...).
- **Stateless UI**: hook không render; chỉ cung cấp state và hành động.
- **Composable**: dễ kết hợp với atoms/query/context; nhận dependency qua params thay vì import cứng.
- **Testing**: viết hook sao cho có thể test bằng `renderHook` hoặc mock dependencies.

## Khi nào tạo hook mới?
- Logic được dùng lại ở ≥ 2 component.
- Cần gom side-effect (permission, event listener, analytics).
- Muốn chuẩn hoá API (ví dụ wrapper form, fetch).

Tuân thủ các guideline trên giúp hook dễ chia sẻ, đoán được API và giảm duplicated code.
