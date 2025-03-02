export const getCurrentTimeStamp = () => {
  let date = new Date();

  return date
    .toLocaleString('en-US', {
      weekday: 'short',

      month: 'short',

      day: '2-digit',

      year: 'numeric',

      hour: '2-digit',

      minute: '2-digit',

      second: '2-digit',
    })
    .replace(/\s/g, '');
};
