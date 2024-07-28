import sortObject from "deep-sort-object";

export const flattenJson = (
  data: any,
  parentKey: string | number = "",
  result: { [key: string]: string } = {},
) => {
  for (const key in data) {
    if (key in data) {
      const newKey = parentKey
        ? `${parentKey}.${key}`
        : (key as keyof typeof data);
      if (
        typeof data[key] === "object" &&
        !Array.isArray(data[key]) &&
        data[key] !== null
      ) {
        if (typeof newKey !== "symbol") flattenJson(data[key], newKey, result);
      } else {
        if (typeof newKey !== "symbol") {
          result[newKey] = data[key];
        }
      }
    }
  }
  return sortObject(result);
};
