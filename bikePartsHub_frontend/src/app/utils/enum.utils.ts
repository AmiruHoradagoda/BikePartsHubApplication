export function enumToArray(enumObj: any): string[] {
  return Object.keys(enumObj).map((key) => enumObj[key]);
}
