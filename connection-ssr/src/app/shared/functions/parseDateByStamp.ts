export const parseDateByStamp = (dateStamp: string | number) => {
  const res = new Date(Number(dateStamp));
  const month = `0${res.getMonth() + 1}`.slice(-2);
  const day = `0${res.getDay() + 1}`.slice(-2);
  const date = `${res.getFullYear()}-${month}-${day}`;
  const hours = `0${res.getHours()}`.slice(-2);
  const minutes = `0${res.getMinutes()}`.slice(-2);
  const seconds = `0${res.getSeconds()}`.slice(-2);
  const time = `${hours}:${minutes}:${seconds}`;
  return `${date} ${time}`;
};
