import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

import { COLORS } from '@/constants';

function TabBarIcon(props: { name: React.ComponentProps<typeof FontAwesome>['name']; color: string }) {
  return <FontAwesome size={22} {...props} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShadowVisible: false,
        tabBarActiveTintColor: COLORS.BRAND_PRIMARY,
        tabBarStyle: { borderTopWidth: 0 },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Khám phá',
          tabBarIcon: ({ color }) => <TabBarIcon name="cutlery" color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Đơn hàng',
          tabBarIcon: ({ color }) => <TabBarIcon name="list-alt" color={color} />,
        }}
      />
    </Tabs>
  );
}
