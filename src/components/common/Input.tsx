import { forwardRef } from 'react';
import type { TextInputProps } from 'react-native';
import { Text, TextInput, View } from 'react-native';

type InputProps = TextInputProps & {
  label?: string;
  error?: string;
};

export const Input = forwardRef<TextInput, InputProps>(({ label, error, ...props }, ref) => (
  <View className="w-full gap-2">
    {label ? <Text className="text-sm font-medium text-neutral-600">{label}</Text> : null}
    <TextInput
      ref={ref}
      placeholderTextColor="#9CA3AF"
      className="rounded-xl border border-neutral-200 px-4 py-3 text-base text-neutral-800"
      {...props}
    />
    {error ? <Text className="text-xs text-red-500">{error}</Text> : null}
  </View>
));

