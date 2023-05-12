import Joi from "joi";
const customer = Joi.object({
  cpf: Joi.string()
    .length(11)
    .pattern(/^[0-9]+$/)
    .required(),
  phone: Joi.string()
    .min(10)
    .max(11)
    .pattern(/^[0-9]+$/)
    .required(),
  name: Joi.string().trim().min(1).required(),
  birthday: Joi.date().required(),
});
export default customer;
//pegar como a data sera enviada do front end
