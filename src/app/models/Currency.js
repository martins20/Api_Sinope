import Sequelize, { Model } from 'sequelize';

class Currency extends Model {
  // Método obrigatório que chama a função init() da Classe pai (Model)
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        value: Sequelize.INTEGER,
        fixed: Sequelize.BOOLEAN,
        date: Sequelize.DATE,
        category: Sequelize.STRING,
        expense: Sequelize.BOOLEAN,
        user_id: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Currency;
