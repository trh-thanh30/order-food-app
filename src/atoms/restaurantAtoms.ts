import { atom } from 'jotai';
import type { IRestaurant } from '@/types';
import { restaurantService } from '@/services/restaurantService';

export const restaurantListAtom = atom<IRestaurant[]>([]);
export const cuisineFilterAtom = atom<string | null>(null);
export const searchQueryAtom = atom('');

export const filteredRestaurantsAtom = atom(get => {
  const restaurants = get(restaurantListAtom);
  const cuisine = get(cuisineFilterAtom);
  const search = get(searchQueryAtom).toLowerCase();

  return restaurants.filter(restaurant => {
    const matchesCuisine = cuisine ? restaurant.cuisine === cuisine : true;
    const matchesSearch = restaurant.name.toLowerCase().includes(search);
    return matchesCuisine && matchesSearch;
  });
});

export const loadRestaurantsAtom = atom(
  null,
  async (_get, set) => {
    const restaurants = await restaurantService.listRestaurants();
    set(restaurantListAtom, restaurants);
    return restaurants;
  },
);
