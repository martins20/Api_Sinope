import Currency from '../models/Currency';

class CurrencyController {
  async store(req, res) {
    const { title, value, fixed, date, category, expense } = req.body;
    const { userId: user_id } = req;

    const currency = await Currency.create({
      title,
      value,
      fixed,
      date,
      category,
      expense,
      user_id,
    });

    return res.status(200).json(currency);
  }
}

export default new CurrencyController();
