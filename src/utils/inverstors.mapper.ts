export const dtoToEntity = async <T>(
  dto: any,
  entityClass: { new (): T },
): Promise<T> => {
  const entity = new entityClass();
  Object.assign(entity, dto);
  return entity;
};
