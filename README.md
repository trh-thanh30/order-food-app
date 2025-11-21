# order-food 🍱

Ứng dụng **order-food** là một nền tảng di động xây dựng bằng React Native + Expo giúp người dùng khám phá nhà hàng, đặt món và theo dõi đơn hàng thời gian thực. Dự án này được thiết kế như một template chuyên nghiệp với Expo Router, TypeScript và bộ công cụ DevOps hoàn chỉnh để bạn có thể mở rộng nhanh chóng.

## 🔧 Tech Stack chính

- **Expo SDK 49** với **Expo Router** để cấu hình điều hướng chuẩn web
- **React Native 0.72** + **TypeScript strict** bảo vệ type-safety toàn dự án
- **NativeWind + TailwindCSS** cho styling nhất quán và nhanh
- **TanStack Query (@react-query/native)** & Axios để fetching dữ liệu có cache
- **Zustand + Jotai + React Context** quản lý state cục bộ & toàn cục
- **React Hook Form + Zod** đảm bảo form validation type-safe
- **Lucide React Native + @expo/vector-icons** cung cấp hệ icon linh hoạt
- **usehooks-ts** cho 50+ utility hook sẵn dùng (debounce, async, storage, ...)
- **Jest + Testing Library** đảm bảo testable architecture

## 🗂️ Cấu trúc thư mục

```
order-food/
├── app/                     # Expo Router, navigation, layouts, screens
│   └── README.md
├── src/                     # Nơi chứa business logic & UI components
│   ├── atoms/               # Jotai atoms (auth, cart, restaurant)
│   ├── hooks/               # Custom hooks (useAuth, useCart, useForm, useFetch…)
│   ├── data/                # Zod schema & dữ liệu tĩnh
│   ├── components/          # Common + feature-specific components
│   ├── lib/                 # Client/API wrappers, notifications, storage
│   ├── types/               # TypeScript definitions & module typing
│   ├── utils/               # Helpers, formatters, validators
│   ├── constants/           # Colors, spacing, typography, routes
│   ├── styles/              # Theme + global styles
│   ├── context/             # React Context providers
│   └── services/            # API services, business orchestration
├── assets/                  # Fonts, icons, images
├── __tests__/               # Jest + Testing Library specs
├── .env.example             # Biến môi trường mẫu
├── .prettierrc.example      # Chuẩn hoá formatting
├── app.json                 # Config Expo
├── babel.config.js          # Babel + alias '@/...'
├── package.json             # Scripts & dependencies
├── tailwind.config.js       # Global Tailwind setup
├── tsconfig.json            # TypeScript strict + path alias
└── README.md                # Tài liệu chính (file này)
```

## 🚀 Bắt đầu

1. **Cài đặt dependencies**
   ```bash
   npm install
   ```
2. **Tạo file môi trường**
   ```bash
   cp .env.example .env
   # cập nhật API base URL, token...
   ```
3. **Khởi chạy Expo**
   ```bash
   npm run start        # Expo Go / dev menu
   npm run android      # Mở trên Android emulator/device
   npm run ios          # Mở trên iOS simulator (macOS)
   npm run web          # Chạy trên web
   ```
4. **Kiểm tra chất lượng**
   ```bash
   npm run lint
   npm run typecheck
   npm test
   ```

## 📦 Packages theo nhóm chức năng

| Nhóm                       | Packages / Thư viện                                                                                                                |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| 1. Navigation & Routing    | `expo-router`, `expo-splash-screen`, `react-native-screens`, `react-native-safe-area-context`, `react-native-gesture-handler`      |
| 2. State Management        | `zustand`, `jotai`, React Context (custom providers)                                                                               |
| 3. Server/Data Fetching    | `axios`, `@react-query/native` (TanStack 5), `react-query` (bridge for legacy hooks)                                               |
| 4. Forms & Validation      | `react-hook-form`, `yup`, `zod`, `@hookform/resolvers`                                                                             |
| 5. Schema & Data Layer     | Zod schema tại `src/data/schema/**` (auth/order/payment, ...); type inference qua `z.infer`                                        |
| 6. Utility Hooks           | `usehooks-ts` (useAsync, useLocalStorage, useToggle, useDebounce, usePrevious, useWindowSize, useCounter, useTimeout, useInterval) |
| 7. UI & Styling            | `nativewind`, `tailwindcss`, `react-native-svg`, `@expo/vector-icons`                                                              |
| 8. Iconography             | `lucide-react-native`                                                                                                              |
| 9. Storage & Secure Auth   | `@react-native-async-storage/async-storage`, `expo-secure-store`                                                                   |
| 10. Notifications & Perms  | `expo-notifications`, `expo-permissions`                                                                                           |
| 11. Media & Image Handling | `expo-image-picker`, `expo-media-library`                                                                                          |
| 12. Date & Utilities       | `date-fns`, `lodash`, `uuid`, `classnames`                                                                                         |
| 13. Tooling & Testing      | `typescript`, `jest`, `jest-expo`, `@testing-library/react-native`, `eslint`, `prettier`, `nativewind`, `tailwindcss`              |

## 📜 Scripts npm

| Script              | Mô tả                                                          |
| ------------------- | -------------------------------------------------------------- |
| `npm run start`     | Khởi chạy Metro + Expo Router                                  |
| `npm run android`   | Mở project trên Android                                        |
| `npm run ios`       | Mở project trên iOS simulator                                  |
| `npm run web`       | Preview trên web                                               |
| `npm run lint`      | Chạy ESLint với rule @react-native/eslint-config + import-sort |
| `npm run typecheck` | Kiểm tra TypeScript strict                                     |
| `npm test`          | Jest + Testing Library                                         |

## 🧭 Convention & Best Practices

- **Naming**: Component PascalCase, hooks camelCase bắt đầu bằng `use`, atoms hậu tố `Atom`, types PascalCase prefix `I`, constants UPPER_SNAKE_CASE.
- **Folder hóa component**: mỗi component nằm trong folder riêng nếu kèm styles/tests/types; feature component = domain folder.
- **State**: dùng atoms trong `src/atoms` hoặc Zustand cho client state; TanStack Query quản lý server state; tránh lưu server state trong Context.
- **Schema-first**: validate input bằng Zod schema (`src/data/schema/**`), sau đó dùng helper ở `src/hooks/useForm`.
- **Hooks**: wrap logic chung thành hook (`useFetch`, `useForm`, `useDebounceValue`...), tái sử dụng hook từ `usehooks-ts`.
- **Styles**: dùng NativeWind + token trong `src/styles`, icon từ `lucide-react-native` hoặc `@expo/vector-icons`.
- **Testing**: thêm spec vào `__tests__` hoặc cạnh file; mock API qua axios mock hoặc MSW.

## 🔗 README con

- [`app/README.md`](./app/README.md)
- [`src/hooks/README.md`](./src/hooks/README.md)
- [`src/components/README.md`](./src/components/README.md)
- [`src/atoms/README.md`](./src/atoms/README.md)
- [`src/data/README.md`](./src/data/README.md)
- [`src/lib/README.md`](./src/lib/README.md)
- [`src/types/README.md`](./src/types/README.md)
- [`src/utils/README.md`](./src/utils/README.md)
- [`src/constants/README.md`](./src/constants/README.md)
- [`src/styles/README.md`](./src/styles/README.md)
- [`src/context/README.md`](./src/context/README.md)
- [`src/services/README.md`](./src/services/README.md)

## 📚 Checklist triển khai

- [x] Expo Router cấu hình trong `app/`
- [x] TypeScript strict + alias `@/`
- [x] NativeWind + Tailwind config
- [x] TanStack Query client & Zustand store mẫu
- [x] README hướng dẫn đầy đủ (file này + từng thư mục)

Hãy xem các README con để hiểu sâu hơn từng layer (hooks, services, lib, ...). Chúc các bạn ptit build app order-food thật ngon miệng! 🍽️
