module.exports = (body, app) => {
  const errors = [];

  if (body.id <= 0) {
    errors.push('O Id é obrigatório!');
  }

  if (body.bestPayDay == '') {
    errors.push('O campo Melhor dia de Pagamento é obrigatório!');
  }

  if (body.clientStatus == '') {
    errors.push('O campo de Status de Cliente é obrigatório!');
  }

  if (body.cnpj == '') {
    errors.push('O campo de Cnpj é obrigatório!');
  }

  if (body.corporateName == '') {
    errors.push('O campo Nome da Empresa é obrigatório!');
  }

  if (body.cpf == '') {
    errors.push('O campo de Cpf é obrigatório!');
  }

  if (body.customerInformation == '') {
    errors.push('O campo de Informação de Customer é obrigatório!');
  }

  if (body.email == '') {
    errors.push('O campo de Email é obrigatório!');
  }

  if (body.image == '') {
    errors.push('O campo da Imagem é obrigatório!');
  }

  if (body.name == '') {
    errors.push('O campo de Nome é obrigatório!');
  }

  if (body.nameCompany == '') {
    errors.push('O campo Nome da Companhia é obrigatório!');
  }

  if (body.phone == '') {
    errors.push('O campo de Telefone é obrigatório!');
  }

  if (body.typeClient == '') {
    errors.push('O campo Tipo de Cliente é obrigatório!');
  }

  if (body.address == '') {
    errors.push('O campo de Endereço é obrigatório!');
  }

  return errors;
};
