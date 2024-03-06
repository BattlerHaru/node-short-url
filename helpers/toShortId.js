const { nanoid } = require("nanoid");

const getShortId = async () => {
  const shortId = nanoid(10);
  return shortId;
};

module.exports = {
  getShortId,
};
