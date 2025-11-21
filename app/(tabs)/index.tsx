import { ScrollView, Text, View } from 'react-native';

import { Button, RestaurantCard } from '@/components';
import type { IRestaurant } from '@/types/food';

const restaurants: IRestaurant[] = [
  {
    id: '1',
    name: 'Pizza 365',
    rating: 4.7,
    deliveryTimeMinutes: 25,
    distanceKm: 1.5,
    heroImage:
      'https://images.unsplash.com/photo-1608039829574-7536250aeb91?auto=format&fit=crop&w=800&q=80',
    menu: [],
  },
  {
    id: '2',
    name: 'Sushi Corner',
    rating: 4.9,
    deliveryTimeMinutes: 35,
    distanceKm: 2.1,
    heroImage:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80',
    menu: [],
  },
];

export default function TabOneScreen() {
  return (
    <ScrollView className="flex-1 bg-neutral-50 p-4">
      <View className="mb-6 flex-row items-end justify-between">
        <View>
          <Text className="text-sm text-neutral-500">Xin chào 👋</Text>
          <Text className="text-2xl font-semibold text-neutral-900">Đặt món nhanh chóng</Text>
        </View>
        <Button label="Khuyến mãi" variant="secondary" onPress={() => {}} />
      </View>

      <View className="gap-4">
        {restaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.id} restaurant={restaurant} />
        ))}
      </View>
    </ScrollView>
  );
}
