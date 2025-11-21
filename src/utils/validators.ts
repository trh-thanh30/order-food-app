export const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

export const isNonEmpty = (value?: string | null) => Boolean(value && value.trim().length > 0);

export const hasMinLength = (value: string, min: number) => value.trim().length >= min;

