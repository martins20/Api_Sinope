import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init({
      name: Sequelize.STRING,
      email: Sequelize.STRING,
      password_hash: Sequelize.STRING,
      password: Sequelize.VIRTUAL,
      avatar_id: Sequelize.INTEGER
    },
      {
        sequelize,
      }
    );
    
    // antes de salvar um usuario pega o password do req.body e gera o valor de password_hash
    this.addHook('beforeSave', async (user) => {
      if(user.password) user.password_hash = await bcrypt.hash(user.password, 4);  
    });

    return this;
  }

  // verifica se a senha informada é a senha correta fazendo uma comparação
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;