const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('carlosapptest', 'root', '', {
    host: 'localhost',
    dialect:'mysql'
  });

export default sequelize;