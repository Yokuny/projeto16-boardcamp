const getFirst = async (req, res) => {
  console.log("getFirst");
  res.status(200).send(req.body);
};

const postFirst = async (req, res) => {
  console.log("postFirst");
  res.status(200).send(req.body);
};

export default { getFirst, postFirst };
