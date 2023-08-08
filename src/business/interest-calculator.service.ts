export const monthlyCompoundedInterest = async (
  principal: number,
  rate: number,
  time: number,
): Promise<number> => {
  const a = principal * Math.pow(1 + rate / 100, time);
  return a - principal;
};

export const dailyCompoundedInterest = async (
  principal: number,
  rate: number,
): Promise<number> => {
  const dailyRate = Math.pow(1 + rate / 100, 1 / 365) - 1;
  const a = principal * Math.pow(1 + dailyRate, 365);
  return a - principal;
};
