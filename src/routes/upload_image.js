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

  return { upload };
};
