const request = require('supertest');
const app = require('../../../app');
const proprietarioModel = require('../../../src/models/proprietario');
const imovelModel = require('../../../src/models/imovel');


describe('POST /proprietarios', () => {
  beforeEach(() => {
    proprietarioModel.clearData();
  });

  test('inserir um novo proprietário', async () => {
    const novoProprietario = {
      nome: 'João',
      sobrenome: 'Silva',
    };

    const response = await request(app)
      .post('/proprietarios')
      .send(novoProprietario);

    expect(response.statusCode).toEqual(201);

    const proprietarios = proprietarioModel.getAll();
    expect(proprietarios.length).toEqual(1);

    const proprietarioInserido = proprietarios[0];
    expect(proprietarioInserido.nome).toEqual('João');
    expect(proprietarioInserido.sobrenome).toEqual('Silva');
  });

  test('não inserir um proprietário sem nome', async () => {
    const novoProprietario = {
      sobrenome: 'Silva',
    };

    const response = await request(app)
      .post('/proprietarios')
      .send(novoProprietario);

    expect(response.statusCode).toEqual(400);
  });

  test('não inserir um proprietário sem sobrenome', async () => {
    const novoProprietario = {
      nome: 'João',
    };

    const response = await request(app)
      .post('/proprietarios')
      .send(novoProprietario);

    expect(response.statusCode).toEqual(400);
  });
});

describe('PUT /proprietarios/:id', () => {
  beforeEach(() => {
    proprietarioModel.clearData();
  });

  test('editar um proprietário existente', async () => {
    const proprietarioInicial = {
      nome: 'Carlos',
      sobrenome: 'Silva',
    };
    const { body: { id } } = await request(app)
      .post('/proprietarios')
      .send(proprietarioInicial);

    const proprietarioEditado = {
      nome: 'José',
      sobrenome: 'Pereira',
    };

    const response = await request(app)
      .put(`/proprietarios/${id}`)
      .send(proprietarioEditado);

    expect(response.statusCode).toEqual(200);

    const proprietarios = proprietarioModel.getAll();
    expect(proprietarios.length).toEqual(1);

    const proprietarioAtualizado = proprietarios[0];
    expect(proprietarioAtualizado.id).toEqual(id);
    expect(proprietarioAtualizado.nome).toEqual('José');
    expect(proprietarioAtualizado.sobrenome).toEqual('Pereira');
  });

  test('não editar um proprietário inexistente', async () => {
    const proprietarioEditado = {
      nome: 'José',
      sobrenome: 'Pereira',
    };

    const response = await request(app)
      .put('/proprietarios/123')
      .send(proprietarioEditado);

    expect(response.statusCode).toEqual(404);
  });

  test('não editar um proprietário sem nome', async () => {
    const proprietarioInicial = {
      nome: 'Carlos',
      sobrenome: 'Silva',
    };
    const { body: { id } } = await request(app)
      .post('/proprietarios')
      .send(proprietarioInicial);

    const proprietarioEditado = {
      sobrenome: 'Pereira',
    };

    const response = await request(app)
      .put(`/proprietarios/${id}`)
      .send(proprietarioEditado);

    expect(response.statusCode).toEqual(400);
  });

  test('não editar um proprietário sem sobrenome', async () => {
    const proprietarioInicial = {
      nome: 'Carlos',
      sobrenome: 'Silva',
    };
    const { body: { id } } = await request(app)
      .post('/proprietarios')
      .send(proprietarioInicial);

    const proprietarioEditado = {
      nome: 'José',
    };

    const response = await request(app)
      .put(`/proprietarios/${id}`)
      .send(proprietarioEditado);

    expect(response.statusCode).toEqual(400);
  });
});

describe('GET /proprietarios', () => {
  beforeEach(() => {
    proprietarioModel.clearData();
  });

  test('obter todos os proprietários', async () => {
    await request(app).post('/proprietarios').send({ nome: 'Carlos', sobrenome: 'Silva' });
    await request(app).post('/proprietarios').send({ nome: 'Maria', sobrenome: 'Santos' });

    const response = await request(app).get('/proprietarios');

    expect(response.statusCode).toEqual(200);

    const proprietarios = response.body;
    expect(proprietarios.length).toEqual(2);

    expect(proprietarios[0].nome).toEqual('Carlos');
    expect(proprietarios[1].nome).toEqual('Maria');
  });

  test('obter uma lista vazia de proprietários', async () => {
    const response = await request(app).get('/proprietarios');

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual([]);
  });
});

describe('GET /proprietarios/:id', () => {
  beforeEach(() => {
    proprietarioModel.clearData();
  });

  test('retornar um proprietário existente', async () => {
    const { body: { id } } = await request(app).post('/proprietarios').send({ nome: 'Carlos', sobrenome: 'Silva' });

    const response = await request(app).get(`/proprietarios/${id}`);

    expect(response.statusCode).toEqual(200);
    expect(response.body.nome).toEqual('Carlos');
    expect(response.body.sobrenome).toEqual('Silva');
  });

  test('não retornar um proprietário inexistente', async () => {
    const response = await request(app).get('/proprietarios/2');
    expect(response.statusCode).toEqual(404);
    expect(response.body).toEqual({
      error: 'Proprietário não encontrado'
    });
  });
});

describe('POST /imoveis/:imovelId/proprietarios/:proprietarioId', () => {
  beforeEach(() => {
    imovelModel.clearData();
    proprietarioModel.clearData();
  });

  test('associar um proprietário a um imóvel existente', async () => {
    const { body: imovel } = await request(app)
      .post('/imoveis')
      .send({ rua: 'Rua A', cidade: 'Cidade A', estado: 'AA', numero: '123', tipo: 'casa' });

    const { body: proprietario } = await request(app)
      .post('/proprietarios')
      .send({ nome: 'Carlos', sobrenome: 'Silva' });

    const response = await request(app).post(`/imoveis/${imovel.id}/proprietarios/${proprietario.id}`);
    expect(response.statusCode).toEqual(200);

    const imovelAtualizado = await imovelModel.getById(imovel.id);
    expect(imovelAtualizado.proprietarioId).toEqual(proprietario.id);
  });

  test('não associar um proprietário a um imóvel inexistente', async () => {
    const { body: proprietario } = await request(app)
      .post('/proprietarios')
      .send({ nome: 'Carlos', sobrenome: 'Silva' });

    const response = await request(app).post('/imoveis/123/proprietarios/${proprietario.id}');
    expect(response.statusCode).toEqual(404);
    expect(response.body).toEqual({
      error: "Imóvel ou proprietário não encontrado"
    });
  });

  test('não associar um proprietário inexistente a um imóvel existente', async () => {
    const { body: imovel } = await request(app)
      .post('/imoveis')
      .send({ rua: 'Rua A', cidade: 'Cidade A', estado: 'AA', numero: '123', tipo: 'casa' });

    const response = await request(app).post(`/imoveis/${imovel.id}/proprietarios/123`);
    expect(response.statusCode).toEqual(404);
    expect(response.body).toEqual({
      error: "Imóvel ou proprietário não encontrado"
    });
  });
});

describe('DELETE /imoveis/:imovelId/proprietarios/:proprietarioId', () => {
  beforeEach(() => {
    imovelModel.clearData();
    proprietarioModel.clearData();
  });

  test('remover a associação entre um imóvel e um proprietário existente', async () => {
    const { body: imovel } = await request(app)
      .post('/imoveis')
      .send({ rua: 'Rua A', cidade: 'Cidade A', estado: 'AA', numero: '123', tipo: 'casa' });

    const { body: proprietario } = await request(app)
      .post('/proprietarios')
      .send({ nome: 'Carlos', sobrenome: 'Silva' });

    await request(app).post(`/imoveis/${imovel.id}/proprietarios/${proprietario.id}`);

    const imovelComProprietario = await imovelModel.getById(imovel.id);
    expect(imovelComProprietario.proprietarioId).toEqual(proprietario.id);

    const response = await request(app).delete(`/imoveis/${imovel.id}/proprietarios/${proprietario.id}`);
    expect(response.statusCode).toEqual(200);

    const imovelSemProprietario = await imovelModel.getById(imovel.id);
    expect(imovelSemProprietario.proprietarioId).toBeNull();
  });

  test('tentar remover uma associação inexistente entre um imóvel e um proprietário', async () => {
    const { body: imovel } = await request(app)
      .post('/imoveis')
      .send({ rua: 'Rua A', cidade: 'Cidade A', estado: 'AA', numero: '123', tipo: 'casa' });

    const { body: proprietario } = await request(app)
      .post('/proprietarios')
      .send({ nome: 'Carlos', sobrenome: 'Silva' });

    const response = await request(app).delete(`/imoveis/${imovel.id}/proprietarios/${proprietario.id}`);
    expect(response.statusCode).toEqual(404);
    expect(response.body).toEqual({
      error: "Imóvel não está associado a esse proprietário"
    });
  });

  test('tentar remover uma associação de um imóvel inexistente', async () => {
    const { body: proprietario } = await request(app)
      .post('/proprietarios')
      .send({ nome: 'Carlos', sobrenome: 'Silva' });

    const response = await request(app).delete(`/imoveis/123/proprietarios/${proprietario.id}`);
    expect(response.statusCode).toEqual(404);
    expect(response.body).toEqual({
      error: 'Imóvel não encontrado'
    });
  });

  test('tentar remover uma associação de um proprietário inexistente', async () => {
    const { body: imovel } = await request(app)
      .post('/imoveis')
      .send({ rua: 'Rua A', cidade: 'Cidade A', estado: 'AA', numero: '123', tipo: 'casa' });

    const response = await request(app).delete(`/imoveis/${imovel.id}/proprietarios/123`);
    expect(response.statusCode).toEqual(404);
    expect(response.body).toEqual({
      error: "Imóvel não está associado a esse proprietário"
    });
  });
});