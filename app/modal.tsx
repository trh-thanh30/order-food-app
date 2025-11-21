import { ScrollView, Text, View } from 'react-native';

import { Button, Input } from '@/components';
import { useAuth } from '@/hooks';

export default function ModalScreen() {
  const { user, signIn, signOut, loading } = useAuth();

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <Text className="mb-4 text-2xl font-semibold text-neutral-900">Trạng thái đăng nhập</Text>
      {user ? (
        <View className="gap-4">
          <Text className="text-lg text-neutral-700">Xin chào {user.name}</Text>
          <Button label="Đăng xuất" variant="ghost" onPress={signOut} isLoading={loading} />
        </View>
      ) : (
        <View className="gap-4">
          <Input placeholder="email@example.com" keyboardType="email-address" label="Email" />
          <Input placeholder="••••••••" secureTextEntry label="Mật khẩu" />
          <Button
            label="Đăng nhập demo"
            onPress={() => signIn({ email: 'demo@orderfood.com', password: 'password' })}
            isLoading={loading}
          />
        </View>
      )}
    </ScrollView>
  );
}
