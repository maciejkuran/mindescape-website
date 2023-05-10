const shortDate = date => {
  const newDate = new Date(date);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return new Intl.DateTimeFormat('en-GB', options).format(newDate);
};

export default shortDate;
