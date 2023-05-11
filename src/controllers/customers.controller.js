import db from "../database/database.connection.js";

const customersToDisplay = [
  {
    id: 1,
    name: "João Alfredo",
    phone: "21998899222",
    cpf: "01234567890",
    birthday: "1992-10-05",
  },
  {
    id: 2,
    name: "Maria Alfreda",
    phone: "21998899221",
    cpf: "12345678910",
    birthday: "1994-12-25",
  },
];

export const getCustomers = async (req, res) => {
  const a = db.query("SELECT * FROM customers");
  res.status(200).send(a);
};

const customerToFind = {
  id: 1,
  name: "João Alfredo",
  phone: "21998899222",
  cpf: "01234567890",
  birthday: "1992-10-05",
};

export const getCustomer = async (req, res) => {
  res.status(200).send(customerToFind);
};

const customerToAdd = {
  name: "João Alfredo",
  phone: "21998899222",
  cpf: "01234567890",
  birthday: "1992-10-25",
};

export const postCustomer = async (req, res) => {
  res.status(201).send(customerToAdd);
};

const customerToChange = {
  name: "João Alfredo",
  phone: "21998899222",
  cpf: "01234567890",
  birthday: "1992-10-05",
};

export const putCustomer = async (req, res) => {
  res.status(200).send(customerToChange);
};

export default { getCustomers, getCustomer, postCustomer, putCustomer };
