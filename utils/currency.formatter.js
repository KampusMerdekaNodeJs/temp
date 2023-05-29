const formatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

function getFormatter(data) {
  for (let i = 0; i < data.length; i++) {
    data[i].dataValues.price = formatter.format(data[i].dataValues.price);
  }

  return data;
}

module.exports = getFormatter;
