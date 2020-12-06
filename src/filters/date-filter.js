module.exports = (value) => {
  const dateObject = new Date(value);
  return dateObject.toLocaleDateString("de-DE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};
