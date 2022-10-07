const fs = require('fs');
const path = require('path');

module.exports = () => {
  const upload = (req, res) => {
    if (req.file) {
      return res.json({
        erro: false,
        message: 'Upload feito com sucesso!',
        filename: req.file.filename,
      });
    }

    return res.status(400).json({
      erro: true,
      message: 'Erro upload não realizado!',
    });
  };

  const remove = (req, res, next) => {
    fs.unlink(path.resolve(`images/${req.params.id}`), (err) => {
      if (err) return next(err);
      return res.status(201).send();
    });
  };

  return { upload, remove };
};
