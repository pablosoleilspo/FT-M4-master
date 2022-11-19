const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Ability', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:"composite",
    },
    description: {
      type: DataTypes.TEXT,
    },
    mana_cost: {
      type: DataTypes.FLOAT,
      allowNull: false,
      unique:"composite",
      validate: {
        min: 10.0,
        max: 250.0
      }
    },
    summary: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${this.name} (${Math.floor(this.mana_cost)} points of mana) - Description: ${this.description}`
        // name({mana_cost} points of mana) - Description: ${description}" (La mana tienen que ser solo la parte entera)
      }
    }
  })
}

