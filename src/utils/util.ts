export const foldString = (str: string, size: number) => {
  if (str.length < size) return str;
  return `${str.substring(0, size - 9)}...${str.substring(str.length - 6)}`;
};
