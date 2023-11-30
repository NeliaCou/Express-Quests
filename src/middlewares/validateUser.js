const Joi = require("joi");

const userSchema = Joi.object({
  firstname: Joi.string().max(255).required(),
  lastname: Joi.string().max(255).required(),
  email: Joi.string().email().max(255).required(),
  city: Joi.string().max(255).required(),
  language: Joi.string().max(255).required(),
});

const validateUser = (req, res, next) => {
  const { firstname, lastname, email, city, language } = req.body;

  const { error } = userSchema.validate(
    { firstname, lastname, email, city, language },
    { abortEarly: false }
  );

  if (error) {
    res.status(422).json({ validationErrors: error.details });
  } else {
    next();
  }
};

module.exports = validateUser;

// const validateUser = (req, res, next) => {
//   const emailRegex = /[a-z0-9._]+@[a-z0-9-]+\.[a-z]{2,3}/;

//   const { firstname, lastname, email, city, language } = req.body;
//   const errors = [];

//   // Validate firstname
//   if (firstname == null) {
//     errors.push({ field: "firstname", message: "This field is required" });
//   }

//   // Validate lastname
//   if (lastname == null) {
//     errors.push({ field: "lastname", message: "This field is required" });
//   }

//   // Validate email
//   if (!emailRegex.test(email)) {
//     errors.push({ field: "email", message: "Invalid email" });
//   }

//   // Validate city
//   if (city == null) {
//     errors.push({ field: "city", message: "This field is required" });
//   }

//   // Validate language
//   if (language == null) {
//     errors.push({ field: "language", message: "This field is required" });
//   }

//   if (errors.length) {
//     res.status(422).json({ validationErrors: errors });
//   } else {
//     next();
//   }
// };

// module.exports = validateUser;
