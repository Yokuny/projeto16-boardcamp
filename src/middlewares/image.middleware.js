import imageCheckSchema from "../schemas/imageCheck.schema.js";

const imageValidate = () => {
  return async (req, res, next) => {
    const error = await imageCheckSchema(req.body.image);
    if (error) return res.status(400).send(`"image" is not a image url"`);

    next();
  };
};
export default imageValidate;
