import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';

import { Button } from '@/components';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Không tìm thấy trang' }} />
      <View className="flex-1 items-center justify-center gap-4 bg-white p-6">
        <Text className="text-2xl font-semibold text-neutral-900">Ồ! Trang không tồn tại.</Text>
        <Text className="text-center text-base text-neutral-500">
          Có thể đường dẫn đã thay đổi hoặc bị xoá. Hãy quay lại màn hình chính nhé!
        </Text>
        <Link href="/" asChild>
          <Button label="Về trang chủ" />
        </Link>
      </View>
    </>
  );
}
