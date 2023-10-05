const proprietarioModel = require('../models/proprietario');


function getAll(req, res) {
  const proprietarios = proprietarioModel.getAll();
  res.json(proprietarios);
}

function getById(req, res) {
    const id = req.params.id;
  
    const proprietario = proprietarioModel.getById(id);
    
    if (proprietario) {
      res.json(proprietario);
    } else {
      res.status(404).json({ error: 'Proprietário não encontrado' });
    }
  }

  function create(req, res) {
    const { nome, sobrenome} = req.body;
  
    if (!nome || !sobrenome ) {
      return res.status(400).json({ error: 'Nome e sobrenome são obrigatórios' });
    }
  
    const novoProprietario = {
      id: proprietarioModel.getNextId(), 
      nome,
      sobrenome
    };
  
    proprietarioModel.insert(novoProprietario);
  
    res.status(201).json(novoProprietario);
  }

  function update(req, res) {
    const id = req.params.id;
    const { nome, sobrenome } = req.body;
  
    if (!nome || !sobrenome) {
      return res.status(400).json({ error: 'Nome e sobrenome são obrigatórios' });
    }
  
    const proprietarios = proprietarioModel.getAll();
    const proprietario = proprietarios.find((proprietario) => proprietario.id === id);
  
    if (!proprietario) {
      return res.status(404).json({ error: 'Proprietário não encontrado' });
    }
  
    proprietario.nome = nome;
    proprietario.sobrenome = sobrenome;
  
   

  
    proprietarioModel.saveFile(proprietarios);
  
    res.json(proprietario);
  }

  function deleteProprietario(req, res) {
    const id = req.params.id;
  
    const proprietarios = proprietarioModel.getAll();
    const index = proprietarios.findIndex((proprietario) => proprietario.id === id);
  
    if (index === -1) {
      return res.status(404).json({ error: 'Proprietário não encontrado' });
    }
  
    proprietarios.splice(index, 1);
  
    proprietarioModel.saveFile(proprietarios);
  
    res.json({ message: 'Proprietário excluído com sucesso' });
  }
  

module.exports = {
  getAll,
  getById,
  create,
  update,
  delete: deleteProprietario
};
