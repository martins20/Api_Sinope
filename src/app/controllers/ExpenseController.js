import Expense from '../models/Expense';

class ExpenseController {
  async index(req, res) {
    const expenses = await Expense.findAll({
      where: {
        user_id: req.userId,
      },
      attributes: ['id', 'title', 'value', 'fixed', 'date'],
    });

    let expensesCounter = 0;

    let totalExpensesValue = 0;

    await expenses.map((expe) => {
      if (expe) expensesCounter++;
      if (expe) totalExpensesValue += expe.value;
    });

    return res.json({ expensesCounter, totalExpensesValue, expenses });
  }

  async store(req, res) {
    try {
      const { title, value, fixed, date } = req.body;
      const user_id = req.userId;
      if (req.body.value <= 0)
        return res
          .status(401)
          .json({ error: 'Value needs to be more than 0.' });

      const expense = await Expense.create({
        title,
        value,
        fixed,
        date,
        user_id,
      });

      return res.json(expense);
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
        return res
          .status(401)
          .json({ error: "You're not allowed to do this action." });
      }

      if (req.body.value <= 0)
        return res
          .status(401)
          .json({ error: 'Value needs to be more than 0.' });

      expense.update(req.body);

      return res.json(expense);
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
