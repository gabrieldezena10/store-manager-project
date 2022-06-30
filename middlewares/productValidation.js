const httpStatusCode = require('../helpers/httpStatusCode');

const isValidName = (req, res, next) => {
  const { name } = req.body;
  const MIN_LENGTH = 5;

  if (!name) {
    return res.status(httpStatusCode.BAD_REQUEST).json({ message: '"name" is required' });
  }

  if (name.length < MIN_LENGTH) {
    return res
      .status(httpStatusCode.COULD_NOT_PROCESS)
      .json({ message: '"name" length must be at least 5 characters long' });
  }

  next();
};

module.exports = isValidName;