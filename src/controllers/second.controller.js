export const getSecond = async (req, res) => {
  console.log(req.body);
  res.status(200).send(req.body);
};

export const postSecond = async (req, res) => {
  console.log(req.body);
  res.status(200).send(req.body);
};

export default { getSecond, postSecond };
