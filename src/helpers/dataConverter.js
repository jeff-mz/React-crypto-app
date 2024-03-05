const converter = (chart, type) => {
  return chart[type].map((item) => {
    return {
      date: item[0],
      [type]: item[1],
    };
  });
};
export { converter };
