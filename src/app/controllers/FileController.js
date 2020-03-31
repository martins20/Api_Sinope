import File from '../models/File';

class FileController {
  async store(req, res) {
    // multer insere uma variavel chamada file dentro da requisicao
    const { originalname: name, filename: path } = req.file;

    const file = await File.create({
      name,
      path,
    });

    return res.json(file);
  }

  async index(req, res) {
    const files = await File.findAll();

    return res.json(files);
  }
}

export default new FileController();
