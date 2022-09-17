const price = (value) => new Intl.NumberFormat().format(value);

const date = (dateString, format = "") => {
  const value = new Date(dateString);

  const year = value.getFullYear();
  const month = `0${value.getMonth() + 1}`.slice(-2);
  const date = `0${value.getDate()}`.slice(-2);

  const dateObj = {
    yyyy: year,
    mm: month,
    dd: date,
  };

  return format.replace(/dd|mm|yyyy/g, (match) => dateObj[match]);
};

const format = {
  price,
  date,
};

export default format;
