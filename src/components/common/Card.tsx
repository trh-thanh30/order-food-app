import type { ReactNode } from 'react';
import { View } from 'react-native';

type CardProps = {
  children: ReactNode;
  padding?: 'sm' | 'md' | 'lg';
};

const paddingMap = {
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-6',
};

export function Card({ children, padding = 'md' }: CardProps) {
  return <View className={`rounded-2xl bg-white shadow-sm ${paddingMap[padding]}`}>{children}</View>;
}

