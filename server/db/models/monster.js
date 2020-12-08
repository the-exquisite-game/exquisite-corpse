const Sequelize = require('sequelize')
const db = require('../db')

const Monster = db.define('monster', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue: '../images/first_born'
  }
})

module.exports = Monster
