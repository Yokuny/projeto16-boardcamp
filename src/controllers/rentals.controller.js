const allRents = [
  {
    id: 1,
    customerId: 1,
    gameId: 1,
    rentDate: "2021-06-20",
    daysRented: 3,
    returnDate: null, // troca pra uma data quando já devolvido
    originalPrice: 4500,
    delayFee: null,
    customer: {
      id: 1,
      name: "João Alfredo",
    },
    game: {
      id: 1,
      name: "Banco Imobiliário",
    },
  },
];

export const getRentals = async (req, res) => {
  res.status(200).send(allRents);
};

const rentalToPost = {
  customerId: 1,
  gameId: 1,
  daysRented: 3,
};

export const postRental = async (req, res) => {
  res.status(201).send(rentalToPost);
};

export const postRentalFinish = async (req, res) => {
  res.status(200).send("finalizou um aluguel");
};

export const deleteRental = async (req, res) => {
  res.status(200).send("deletou um aluguel");
};

export default { getRentals, postRental, postRentalFinish, deleteRental };
