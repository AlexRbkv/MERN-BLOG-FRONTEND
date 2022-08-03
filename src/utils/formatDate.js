export const formatDate = (string) => {
  const date = new Date(string);
  const dateYear = date.getFullYear();
  const dateMonth = ('0' + (date.getMonth() + 1)).slice(-2);
  const dateDay = ('0' + date.getDate()).slice(-2);
  const dateHours = ('0' + date.getHours()).slice(-2);
  const dateMinutes = ('0' + date.getMinutes()).slice(-2);
  return `${dateDay}.${dateMonth}.${dateYear} | ${dateHours}:${dateMinutes}`;
};
