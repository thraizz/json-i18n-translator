export const unflattenJson = (data: any) => {
  const result: any = {};
  for (const key in data) {
    if (key in data) {
      const keys = key.split(".");
      keys.reduce((acc, curr, index) => {
        return (
          acc[curr] ||
          (acc[curr] = isNaN(Number(keys[index + 1]))
            ? keys.length - 1 === index
              ? data[key]
              : {}
            : [])
        );
      }, result);
    }
  }
  console.log(result);
  return result;
};
