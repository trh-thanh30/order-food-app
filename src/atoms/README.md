# src/atoms/ – Jotai State Management

Thư mục này gom toàn bộ atomic state sử dụng **Jotai**. Atom giúp chia nhỏ state theo domain, tránh re-render toàn bộ cây component và dễ phối hợp với hooks (`useAtom`, `useAtomValue`, `useSetAtom`).

## Cấu trúc hiện tại
```
src/atoms/
├── authAtoms.ts          # authTokenAtom, userAtom, hydrateUserAtom, logoutAtom
├── cartAtoms.ts          # cartItemsAtom, derived totals, mutations
├── restaurantAtoms.ts    # restaurant list, filters, async loader
└── index.ts              # Barrel export
```

## Auth atoms
```ts
// authAtoms.ts
export const authTokenAtom = atom<string | null>(null);
export const userAtom = atom<IUser | null>(null);
export const isAuthenticatedAtom = atom(get => Boolean(get(authTokenAtom) && get(userAtom)));

export const hydrateUserAtom = atom(null, async (get, set) => {
  if (!get(authTokenAtom)) {
    set(userAtom, null);
    return null;
  }
  const profile = await authService.profile();
  set(userAtom, profile);
  return profile;
});
```
- **Async atom**: có thể gọi API trực tiếp trong write function, cho phép hydrate dữ liệu sau khi lấy token.

## Cart atoms
```ts
export const cartItemsAtom = atom<IOrderItem[]>([]);
export const cartSubtotalAtom = atom(get =>
  get(cartItemsAtom).reduce((total, item) => total + item.price * item.quantity, 0),
);
export const addToCartAtom = atom(null, (get, set, payload: IOrderItem) => {
  const items = get(cartItemsAtom);
  // ... cập nhật
});
```
- **Derived atoms** (`cartSubtotalAtom`, `cartTotalQuantityAtom`) chỉ re-render khi giá trị thay đổi.
- **Reset pattern**: `resetCartAtom` write function gán về `[]` → thích hợp khi user logout.

## Restaurant atoms
```ts
export const restaurantListAtom = atom<IRestaurant[]>([]);
export const cuisineFilterAtom = atom<string | null>(null);
export const filteredRestaurantsAtom = atom(get => {
  const data = get(restaurantListAtom);
  const cuisine = get(cuisineFilterAtom);
  const search = get(searchQueryAtom).toLowerCase();
  return data.filter(item => {
    const matchesCuisine = cuisine ? item.cuisine === cuisine : true;
    const matchesSearch = item.name.toLowerCase().includes(search);
    return matchesCuisine && matchesSearch;
  });
});
```
- **Derived view state** giữ restaurant list nguyên bản, filters chỉ áp dụng trên layer derived.
- `loadRestaurantsAtom` là ví dụ async atom với side-effect `restaurantService.list()`.

## Cách sử dụng
```ts
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { userAtom, hydrateUserAtom, cartSubtotalAtom, addToCartAtom } from '@/atoms';

const UserBadge = () => {
  const user = useAtomValue(userAtom);
  const hydrateUser = useSetAtom(hydrateUserAtom);

  useEffect(() => {
    hydrateUser();
  }, [hydrateUser]);

  return <Text>{user?.name ?? 'Guest'}</Text>;
};

const AddToCartButton = ({ item }: { item: IOrderItem }) => {
  const addToCart = useSetAtom(addToCartAtom);
  return <Button label="Add" onPress={() => addToCart(item)} />;
};

const CartTotal = () => {
  const total = useAtomValue(cartSubtotalAtom);
  return <Text>{formatCurrency(total)}</Text>;
};
```

## Best practices
- Tách atom theo domain (auth, cart, restaurant) → dễ tìm & tree-shake.
- Luôn export từ `src/atoms/index.ts` để import bằng `@/atoms`.
- Kết hợp với hooks: ví dụ `useAuth()` chỉ wrap `useAtom` giúp template rõ ràng.
- Dùng derived atom cho dữ liệu tính toán (subtotal) thay vì tính trực tiếp trong component.
- Với side-effect (API, storage), thực hiện trong write function hoặc custom hook bao bọc atom.
