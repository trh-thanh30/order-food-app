import { Image, Text, View } from 'react-native';

import type { IRestaurant } from '@/types/food';

type Props = {
  restaurant: IRestaurant;
};

export function RestaurantCard({ restaurant }: Props) {
  return (
    <View className="w-full overflow-hidden rounded-3xl bg-white shadow-lg">
      <Image source={{ uri: restaurant.heroImage }} className="h-40 w-full" resizeMode="cover" />
      <View className="gap-2 p-4">
        <Text className="text-lg font-semibold text-neutral-900">{restaurant.name}</Text>
        <View className="flex-row items-center gap-3">
          <Text className="text-sm text-neutral-500">{restaurant.rating.toFixed(1)} ★</Text>
          <Text className="text-sm text-neutral-500">{restaurant.deliveryTimeMinutes} phút</Text>
          <Text className="text-sm text-neutral-500">{restaurant.distanceKm} km</Text>
        </View>
      </View>
    </View>
  );
}
