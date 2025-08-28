export const formatDate = (date: Date | string): string => {
  const dateString = new Date(date);
  const localDateString = dateString.toLocaleDateString('en-US', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  return localDateString;
};
