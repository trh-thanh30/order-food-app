import { useForm as useReactHookForm } from 'react-hook-form';
import type { FieldValues, UseFormProps, UseFormReturn, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export const useForm = (schema: z.ZodTypeAny, options?: UseFormProps<FieldValues>): UseFormReturn<
  FieldValues
> => {
  const resolverFactory = zodResolver as unknown as (
    s: z.ZodTypeAny,
  ) => Resolver<FieldValues>;
  const resolver = resolverFactory(schema);

  return useReactHookForm<FieldValues>({
    resolver,
    mode: 'onBlur',
    ...options,
  });
};
