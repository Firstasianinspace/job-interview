export const hasOwnKeys = <T extends object, K extends keyof T>(
  obj: T,
  keys: K | K[]
): boolean => {
  const keyArray = Array.isArray(keys) ? keys : [keys];
  return keyArray.every((key) =>
    Object.prototype.hasOwnProperty.call(obj, key)
  );
};
