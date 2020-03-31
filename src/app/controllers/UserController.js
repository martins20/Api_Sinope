import User from '../models/User';
import File from '../models/File';

class UserController {
  async index(req, res) {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'avatar_id'],
      include: [
        {
          model: File,
          as: 'avatar',
        },
      ],
    });

    res.json(users);
  }

  async store(req, res) {
    const { name, email, password, avatar_id } = req.body;

    const userExists = await User.findOne({
      where: {
        email,
      },
    });

    if (userExists)
      return res
        .status(400)
        .json({ error: 'This email is already registered.' });

    const user = await User.create({
      name,
      email,
      password,
      avatar_id,
    });

    return res.json(user);
  }

  async update(req, res) {
    const {
      name,
      email,
      oldPassword,
      password,
      confirmPassword,
      avatar_id,
    } = req.body;

    const userExists = await User.findOne({ where: { email } });

    const user = await User.findByPk(req.userId);

    if (!userExists)
      return res.status(400).json({ error: 'This email is not registered' });

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    await user.update(req.body);

    return res.json(user);
  }
}

export default new UserController();
