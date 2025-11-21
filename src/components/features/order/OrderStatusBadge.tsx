import classNames from 'classnames';
import { Text, View } from 'react-native';

import type { OrderStatus } from '@/types/order';

const STATUS_STYLES: Record<OrderStatus, string> = {
  pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
  confirmed: 'bg-blue-50 text-blue-700 border-blue-200',
  preparing: 'bg-purple-50 text-purple-700 border-purple-200',
  delivering: 'bg-orange-50 text-orange-700 border-orange-200',
  completed: 'bg-green-50 text-green-700 border-green-200',
};

const STATUS_LABEL: Record<OrderStatus, string> = {
  pending: 'Chờ xác nhận',
  confirmed: 'Đã xác nhận',
  preparing: 'Đang chuẩn bị',
  delivering: 'Đang giao',
  completed: 'Hoàn tất',
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <View className={classNames('rounded-full border px-3 py-1', STATUS_STYLES[status])}>
      <Text className="text-xs font-medium uppercase tracking-wide">{STATUS_LABEL[status]}</Text>
    </View>
  );
}
