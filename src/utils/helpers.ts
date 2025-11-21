export const wait = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const calculateCartTotal = (items: { price: number; quantity: number }[]) =>
  items.reduce((acc, item) => acc + item.price * item.quantity, 0);

