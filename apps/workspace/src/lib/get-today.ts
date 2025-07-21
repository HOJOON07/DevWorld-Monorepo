const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const getToday = () => {
  const today = new Date();

  const monthStr = months[today.getMonth()];
  const dayStr = String(today.getDate()).padStart(2, '0');

  const result = `${monthStr} ${dayStr}`;

  return result;
};
