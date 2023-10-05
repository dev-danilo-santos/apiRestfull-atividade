const fs = require('fs');
const paths = require('./paths');
const { v4: uuidv4 } = require('uuid');


function getNextId() {
    return uuidv4();
  }

function loadFile() {
  if (fs.existsSync(paths.PROPRIETARIO)) {
    const { proprietarios = [] } = JSON.parse(fs.readFileSync(paths.PROPRIETARIO, 'utf-8'));
    return proprietarios;
  } else {
    return [];
  }
}

function saveFile(proprietarios) {
  const data = JSON.stringify({ proprietarios: proprietarios });
  fs.writeFileSync(paths.PROPRIETARIO, data);
}

function getAll() {
  return loadFile();
}

function getById(id) {
  const proprietarios = getAll();
  return proprietarios.find((proprietario) => proprietario.id === id);
}

function insert(proprietario) {
  const proprietarios = getAll();

  proprietario.id = getNextId();
  proprietarios.push(proprietario);

  saveFile(proprietarios);

  return proprietario;
}



module.exports = {
  getAll,
  getById,
  insert,
  getNextId,
  saveFile
};
