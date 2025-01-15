
export const pack = (filter: Record<string, any>): Record<string, any> => {
  const entries = Object.entries(filter).filter(entry => entry[1] !== undefined);
  return Object.fromEntries(entries);
}