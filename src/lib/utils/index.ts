export const formatPrice = (price: number, round = true): string => {
  const formattedPrice = round ? Math.round(price / 100) : price / 100;
  return `$${formattedPrice}`;
};
