const data = (schema) => {
  return (req, res, next) => {
    const error = schema.validate(req.body);
    if (error.error) {
      return res.status(400).send(error.error.details[0].message);
    }
    next();
  };
};
export default data;
