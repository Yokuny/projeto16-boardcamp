import Joi from "joi";
const game = Joi.object({
  customerId: Joi.number().trim().positive().required(),
  gameId: Joi.number().trim().positive().required(),
  daysRented: Joi.number().positive().required(),
});
export default game;
