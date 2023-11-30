const Joi = require("joi");

const userSchema = Joi.object({
  historyId: Joi.number().required(),
  userId: Joi.number().required(),
  filmId: Joi.number().required(),
  visualisationDate: Joi.string().max(255).required(),
});

const validateCountParameters = (req, res, next) => {
  const { historyId, userId, filmId, visualisationDate } = req.body;

  const { error } = userSchema.validate(
    { historyId, userId, filmId, visualisationDate },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

module.exports = validateCountParameters;
