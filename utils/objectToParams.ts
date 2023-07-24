export function objectToParams(obj: Record<string, any>): string {
  const paramArray: string[] = [];

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];

      if (Array.isArray(value)) {
        for (const item of value) {
          paramArray.push(
            `${encodeURIComponent(key)}=${encodeURIComponent(item)}`,
          );
        }
      } else {
        paramArray.push(
          `${encodeURIComponent(key)}=${encodeURIComponent(value)}`,
        );
      }
    }
  }

  return paramArray.join('&');
}

export function paramsToObject(entries: any) {
  const result: any = {};
  for (const [key, value] of entries) {
    if (result[key]) {
      if (Array.isArray(result[key])) {
        result[key].push(value);
      } else {
        result[key] = [result[key], value];
      }
      continue;
    }
    result[key] = value;
  }
  return result;
}
