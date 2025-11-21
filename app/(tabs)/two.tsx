import { ScrollView, Text, View } from 'react-native';

import { Button, Card, OrderStatusBadge } from '@/components';
import { useCart } from '@/hooks';

export default function TabTwoScreen() {
  const { items, total, clearCart } = useCart();

  return (
    <ScrollView className="flex-1 bg-neutral-50 p-4">
      <Text className="mb-4 text-2xl font-semibold text-neutral-900">Đơn hàng của bạn</Text>
      <Card>
        <View className="gap-3">
          {items.length === 0 ? (
            <Text className="text-base text-neutral-600">Giỏ hàng đang trống.</Text>
          ) : (
            items.map((item) => (
              <View key={item.id} className="flex-row items-center justify-between">
                <View>
                  <Text className="font-medium text-neutral-900">
                    {item.quantity} x {item.name}
                  </Text>
                  <Text className="text-sm text-neutral-500">{item.price}đ</Text>
                </View>
                <OrderStatusBadge status="pending" />
              </View>
            ))
          )}
          <View className="flex-row items-center justify-between pt-2">
            <Text className="text-lg font-semibold text-neutral-900">Tổng</Text>
            <Text className="text-lg font-semibold text-brand-primary">{total}đ</Text>
          </View>
          {items.length > 0 && <Button label="Xoá giỏ hàng" variant="ghost" onPress={clearCart} />}
        </View>
      </Card>
    </ScrollView>
  );
}
