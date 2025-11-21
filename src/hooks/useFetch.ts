import type { QueryFunction, QueryKey, UseQueryOptions } from '@react-query/native';
import { useQuery } from '@react-query/native';

export const useFetch = <TQueryFnData, TError = Error>(
  queryKey: QueryKey,
  queryFn: QueryFunction<TQueryFnData>,
  options?: UseQueryOptions<TQueryFnData, TError>
) =>
  useQuery<TQueryFnData, TError>({
    queryKey,
    queryFn,
    ...(options ?? {}),
  });
