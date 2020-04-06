import Sequelize, { Model } from 'sequelize';

class Expense extends Model {
  // Método obrigatório que chama a função init() da Classe pai (Model)
  static init(sequelize) {
    super.init(
      {
        id: {
          type: Sequelize.UUIDV4,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
        },
        title: Sequelize.STRING,
        value: Sequelize.FLOAT,
        fixed: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
  }
}

export default Expense;
