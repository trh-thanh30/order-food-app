# src/components/

Thư mục component được chia thành **common** (tái sử dụng toàn app) và **features** (gắn với một domain cụ thể như Restaurant, Order). Mỗi component nên có folder riêng khi kèm style/test/type.

## Cấu trúc
```
src/components/
├── common/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.types.ts
│   │   └── index.ts
│   ├── Input/
│   └── Card/
├── features/
│   ├── restaurant/
│   │   ├── RestaurantCard.tsx
│   │   └── MenuItemCard.tsx
│   └── order/
│       └── OrderStatusBadge.tsx
└── index.ts            # Barrel export
```

## Best practices
- **Component PascalCase** với file cùng tên (`Button.tsx`). Nếu component phức tạp, tạo folder `Button/` chứa `index.tsx`, `Button.types.ts`, `Button.styles.ts`.
- **Props typing**: khai báo interface trong `src/types` hoặc cùng file:
  ```ts
  import { ReactNode } from 'react';

  interface ButtonProps {
    label: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary';
    leftIcon?: ReactNode;
  }
  ```
- **Styling**: sử dụng NativeWind className + token trong `src/styles/theme.ts` (`className="bg-primary px-4 py-3 rounded-xl"`).
- **Accessibility**: thêm `accessibilityRole`, `testID` cho component quan trọng.
- **Icons**: dùng `lucide-react-native` hoặc `@expo/vector-icons`; wrap icon vào component riêng để tái sử dụng (ví dụ `Icon.tsx`).
- **Folder per component**: khi component có styles, stories hoặc test → gom chung để dễ bảo trì.

## Ví dụ Common Component
```tsx
// src/components/common/Button.tsx
import { Pressable, Text } from 'react-native';
import clsx from 'classnames';
import { Loader2 } from 'lucide-react-native';

export const Button = ({ label, variant = 'primary', loading = false, ...props }) => (
  <Pressable
    className={clsx(
      'rounded-xl items-center justify-center py-3',
      variant === 'primary' ? 'bg-primary text-white' : 'bg-transparent border border-primary'
    )}
    {...props}
  >
    {loading ? (
      <Loader2 size={20} color="#fff" />
    ) : (
      <Text className="font-semibold text-base text-white">{label}</Text>
    )}
  </Pressable>
);
```

## Ví dụ Feature Component
```tsx
// src/components/features/restaurant/RestaurantCard.tsx
import { View, Image, Text } from 'react-native';
import { MapPin, Clock } from 'lucide-react-native';
import { IRestaurant } from '@/types';
import { formatDistanceToNow } from 'date-fns';

export const RestaurantCard = ({ restaurant }: { restaurant: IRestaurant }) => (
  <View className="bg-white rounded-2xl shadow-soft p-4 gap-3">
    <Image source={{ uri: restaurant.banner }} className="h-32 w-full rounded-xl" />
    <View className="gap-1">
      <Text className="text-lg font-semibold">{restaurant.name}</Text>
      <Text className="text-muted">{restaurant.cuisine}</Text>
    </View>
    <View className="flex-row items-center gap-2">
      <MapPin size={18} color="#FF4B3A" />
      <Text className="text-muted flex-1">{restaurant.address}</Text>
    </View>
    <View className="flex-row items-center gap-2">
      <Clock size={18} color="#FF4B3A" />
      <Text className="text-muted flex-1">
        {formatDistanceToNow(new Date(restaurant.updatedAt), { addSuffix: true })}
      </Text>
    </View>
  </View>
);
```

## Tổ chức import/export
- Dùng `src/components/index.ts` để export các component được re-export nhiều lần.
- Feature component có thể export tại chỗ và import bằng alias `@/components/features/restaurant/RestaurantCard`.
- Nếu component có nhiều biến thể, export object thay vì default: `export const Button = Object.assign(BaseButton, { IconButton });`.

## Testing
Sử dụng `@testing-library/react-native` đặt file test song song (`Button.test.tsx`) hoặc trong `__tests__`. Ưu tiên test behavior (press, input) thay vì snapshot.

Ví dụ:

```tsx
import { render, fireEvent } from '@testing-library/react-native';
import { Button } from '@/components/common/Button';

it('calls onPress', () => {
  const onPress = jest.fn();
  const { getByText } = render(<Button label=\"Order\" onPress={onPress} />);
  fireEvent.press(getByText('Order'));
  expect(onPress).toHaveBeenCalled();
});
```

Giữ cấu trúc rõ ràng giúp scale component library nhanh chóng.
