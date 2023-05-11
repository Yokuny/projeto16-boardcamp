const games = [
  {
    id: 1,
    name: "Banco Imobiliário",
    image: "http://",
    stockTotal: 3,
    pricePerDay: 1500,
  },
  {
    id: 2,
    name: "Detetive",
    image: "http://",
    stockTotal: 1,
    pricePerDay: 2500,
  },
];

const getGames = async (req, res) => {
  res.status(200).send(games);
};

const reqBody = {
  name: "Banco Imobiliário",
  image: "http://www.imagem.com.br/banco_imobiliario.jpg",
  stockTotal: 3,
  pricePerDay: 1500,
};

const postGame = async (req, res) => {
  res.status(201).send(reqBody);
};

export default { getGames, postGame };
