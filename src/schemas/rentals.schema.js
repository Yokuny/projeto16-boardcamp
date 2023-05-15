import Joi from "joi";
const game = Joi.object({
  customerId: Joi.number().positive().required(),
  gameId: Joi.number().positive().required(),
  daysRented: Joi.number().positive().required(),
});
export default game;
