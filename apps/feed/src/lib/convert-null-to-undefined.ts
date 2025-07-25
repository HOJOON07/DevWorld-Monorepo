export const convertNullToUndefined = (obj: { [key: string]: any }) => {
  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [key, value === null ? undefined : value]),
  );
};
