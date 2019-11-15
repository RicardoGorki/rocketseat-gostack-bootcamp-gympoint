import Sequelize, { Model } from 'sequelize';

class HelpOrder extends Model {
  static init(sequelize) {
    super.init(
      {
        question: Sequelize.STRING,
        answer: Sequelize.STRING,
        answer_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
    return this;
  }

  static associate(models) {
    this.belongsTo(models.Registration, {
      foreignKey: 'student_id',
      as: 'student',
    });
    this.belongsTo(models.HelpOrder, {
      foreignKey: 'id',
      as: 'helpOrders',
    });
  }
}

export default HelpOrder;
