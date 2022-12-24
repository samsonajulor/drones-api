// Introduce a periodic task to check drones battery levels and create history/audit event log for this
const audit = (sequelize: any, DataTypes: any): any => {
  const Audits = sequelize.define(
    'Audits',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      serialNumber: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      model: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      weight: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      battery: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      state: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      medications: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {}
  );
  Audits.associate = (models: any): void => {
    Audits.belongsTo(models.Drones, { foreignKey: 'serialNumber' });
  };
  Audits.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      serialNumber: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      model: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      weight: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      battery: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      state: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      medications: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Audits',
    }
  );
  return Audits;
};

module.exports = audit;
