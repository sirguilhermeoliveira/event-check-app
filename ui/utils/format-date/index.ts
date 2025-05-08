export const formatDate = (date: string | null | undefined): string => {
  if (!date || (typeof date !== 'string')) {
    return 'N/A';
  }
  return new Date(date).toLocaleString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      })
};