import Joi from "joi";
const postGame = Joi.object({
  name: Joi.string().trim().min(1).required(),
  image: Joi.string().trim().min(1).required(),
  stockTotal: Joi.number().positive().required(),
  pricePerDay: Joi.number().positive().required(),
});
export default postGame;
