export const getUnopenedMailLabel = (count: number) =>
  count > 99 ? '99+' : String(count);
