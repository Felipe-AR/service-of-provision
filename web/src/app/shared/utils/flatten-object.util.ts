export interface FlattenObject<T> {
  [key: string]: T extends Object ? FlattenObject<T[keyof T]> : T;
}

export function flattenObject<T extends Object>(obj: T, prefix = ''): FlattenObject<T> {
  const flattened = {} as FlattenObject<T>;

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key as keyof T];
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (typeof value === 'object' && value !== null && !Array.isArray(value) && !(value instanceof Date)) {
        const nested = flattenObject(value, newKey);
        Object.assign(flattened, nested);
      } else {
        flattened[newKey] = value as T extends Object ? FlattenObject<T[keyof T]> : T;
      }
    }
  }

  return flattened;
}