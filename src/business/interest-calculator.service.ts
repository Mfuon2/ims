export const earnedCompoundedInterest = async (
  principal: number,
  rate: number,
  time: number,
): Promise<number> => {
  const a = principal * Math.pow(1 + rate / 100, time);
  return a - principal;
};
