import { atom } from 'jotai';
import type { IAuthUser } from '@/types';
import { authService } from '@/services/authService';

export const authTokenAtom = atom<string | null>(null);
export const userAtom = atom<IAuthUser | null>(null);

export const isAuthenticatedAtom = atom(get => Boolean(get(authTokenAtom) && get(userAtom)));

export const hydrateUserAtom = atom(
  null,
  async (get, set) => {
    const token = get(authTokenAtom);
    if (!token) {
      set(userAtom, null);
      return null;
    }
    const profile = await authService.me();
    set(userAtom, profile.user);
    set(authTokenAtom, profile.token);
    return profile.user;
  },
);

export const logoutAtom = atom(null, async (_get, set) => {
  await authService.logout();
  set(authTokenAtom, null);
  set(userAtom, null);
});
