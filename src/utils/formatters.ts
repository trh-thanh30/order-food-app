import { format } from 'date-fns';

export const formatCurrency = (value: number, currency = 'VND') =>
  new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency,
    maximumFractionDigits: currency === 'VND' ? 0 : 2,
  }).format(value);

export const formatDateTime = (date: string | number | Date, dateFormat = 'dd/MM/yyyy HH:mm') =>
  format(new Date(date), dateFormat);

