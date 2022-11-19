const { DataTypes } = require('sequelize');

module.exports = sequelize => {
  sequelize.define('Character', {
    code: {
      type: DataTypes.STRING(5),
      primaryKey: true,
      allowNull: false,
      validate: {
        customValidator(value) {
          if (value.toLowerCase() === 'henry') {
            throw new Error("Error no puede ser HENRY");
          }
        }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notIn: [["Henry", "SoyHenry", "Soy Henry"]]
      }
      //tambien se puede hacer
      // //fn(value){
      //   if(value === 'soy Henry'){
      //     throw new Error ('no puede ser soy Henry')
      //   }
      // }
    },
    age: {
      type: DataTypes.INTEGER,
      get() {
        const value = this.getDataValue('age');
        return value ? value + ' years old' : null
      }
    },
    race: {
      type: DataTypes.ENUM('Human', 'Elf', 'Machine', 'Demon', 'Animal', 'Other'),
      defaultValue: "Other",
    },
    hp: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    mana: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    date_added: {
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW,
    }
  },
  {
    timestamps: false,
  })
}



