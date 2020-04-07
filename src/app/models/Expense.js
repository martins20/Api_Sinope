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
        // category_id: {
        //   type: Sequelize.STRING,
        //   validate: {
        //     len: {
        //       args: [0, 7],
        //       msg: 'Color should be 0 to 7 characters.',
        //     },
        //   },
        // },
        title: Sequelize.STRING,
        value: Sequelize.FLOAT,
        fixed: Sequelize.BOOLEAN,
        date: Sequelize.DATE,
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
