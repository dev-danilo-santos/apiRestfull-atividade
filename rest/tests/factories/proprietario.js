const { pt_BR, Faker } = require('@faker-js/faker');

module.exports = {
  createProprietario,
};

const faker = new Faker({ locale: pt_BR });

function createProprietario(proprietario) {
  return {
    id: faker.datatype.id,
    nome: faker.person.firstName(),
    sobrenome: faker.person.lastName(),
    imovel_id: null,
    ...proprietario,
  };
}
