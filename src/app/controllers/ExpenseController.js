import Expense from '../models/Expense';

class ExpenseController {
  async index(req, res) {
    const expenses = await Expense.findAll({
      where: {
        user_id: req.userId,
      },
      attributes: ['id', 'title', 'value', 'fixed', 'date'],
    });
    return res.json(expenses);
  }

  async store(req, res) {
    try {
      const { title, value, fixed, date } = req.body;
      const user_id = req.userId;
      if (req.body.value <= '')
        return res
          .status(401)
          .json({ error: 'Value needs to be more than 0.' });

      if (!fixed) {
        const expense = await Expense.create({
          title,
          value,
          fixed: false,
          date,
          user_id,
        });

        return res.json({
          id: expense.id,
          title,
          value,
          fixed: expense.fixed,
          user_id,
          date,
        });
      }

      const expense = await Expense.create({
        title,
        value,
        fixed,
        date,
        user_id,
      });

      return res.json({
        id: expense.id,
        title,
        value,
        fixed: expense.fixed,
        user_id,
        date,
      });
    } catch (err) {
      res.status(400).json(err);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      const expense = await Expense.findByPk(id);
      const user_id = req.userId;

      if (expense.user_id !== user_id) {
        console.log(expense);
        return res.status(401).json({ error: 'This expense is not yours.' });
      }

      if (req.body.value <= '')
        return res
          .status(401)
          .json({ error: 'Value needs to be more than 0.' });

      expense.update(req.body);

      return res.json({ message: 'Expense successfully updated !' });
    } catch (err) {
      return res.status(400).json({ error: 'Expense not exists.' });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      const user_id = req.userId;

      const expense = await Expense.findByPk(id);

      if (expense.user_id !== user_id)
        return res.status(401).json({ error: 'Expense not exists.' });

      expense.destroy();

      return res.json({ message: 'Expense successfully deleted !' });
    } catch (err) {
      return res.status(400).json({ error: 'Expense not exists.' });
    }
  }
}

export default new ExpenseController();
