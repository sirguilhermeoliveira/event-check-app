export const formatDate = (date?: string | Date | null | undefined): string => {
  if (!date) return 'N/A';
  const parsedDate = typeof date === 'string' ? new Date(date) : date;
  return parsedDate.toLocaleDateString();
};