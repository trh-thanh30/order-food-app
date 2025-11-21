import { ActivityIndicator, Pressable, Text } from 'react-native';
import classNames from 'classnames';

type ButtonProps = {
  label: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  isLoading?: boolean;
  disabled?: boolean;
  onPress?: () => void;
};

const VARIANTS: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-brand-primary',
  secondary: 'bg-brand-secondary',
  ghost: 'bg-transparent border border-brand-primary',
};

export function Button({
  label,
  variant = 'primary',
  isLoading,
  disabled,
  onPress,
}: ButtonProps) {
  const baseClasses =
    'w-full items-center rounded-xl px-4 py-3 active:opacity-80 flex-row justify-center gap-2';

  return (
    <Pressable
      className={classNames(baseClasses, VARIANTS[variant], {
        'opacity-60': disabled || isLoading,
      })}
      disabled={disabled || isLoading}
      onPress={onPress}>
      {isLoading && <ActivityIndicator color="white" />}
      <Text className="text-base font-semibold text-white">{label}</Text>
    </Pressable>
  );
}

