const { Sequelize, Op } = require('sequelize');
const modelCharacter = require('./models/Character.js');
const modelAbility = require('./models/Ability.js');
const modelRole = require('./models/Role.js');

const db = new Sequelize('postgres://postgres:Admin123@localhost:5432/henry_sequelize', {
  logging: false,
});

modelCharacter(db);
modelAbility(db);
modelRole(db);

//RELACIONES
const { Character, Ability, Role } =db.models

//Relacion de 1 a muchos
Character.hasMany(Ability);
Ability.belongsTo(Character);

//Relacion de muchos a muchos
Character.belongsToMany(Role, { through: 'Character_Role'});
Role.belongsToMany(Character, { through: 'Character_Role'})



module.exports = {
  ...db.models,
  db,
  Op
}