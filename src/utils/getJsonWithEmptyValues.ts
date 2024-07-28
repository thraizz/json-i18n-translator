function emptyValues(obj: any): any {
  if (typeof obj !== "object" || obj === null) {
    // If it's not an object, return it as an empty string
    return "";
  }

  // If it is an array, process each element
  if (Array.isArray(obj)) {
    return obj.map(emptyValues);
  }

  // If it is an object, recursively process each key
  const result: any = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = emptyValues(obj[key]);
    }
  }
  return result;
}

export const getJsonWithEmptyValues = (doc: object) => {
  const data = Object.values(doc)[0];
  const result = emptyValues(data);

  return result;
};
