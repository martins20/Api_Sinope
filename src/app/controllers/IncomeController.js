import Currency from '../models/Currency';

class IncomeController {
  async index(req, res) {
    const { userId: user_id } = req;

    const expenses = await Currency.findAll({
      where: {
        user_id,
        expense: false,
      },
    });

    return res.status(200).json(expenses);
  }
}

export default new IncomeController();
