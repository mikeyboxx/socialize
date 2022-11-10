//Import sequelize library/package
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

//Defines 'Comment' as a model
class Reaction extends Model {}

//Creates a new model for a Comment
Reaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    post_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "post",
          key: "id",
        },
      },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "reaction",
  }
);

module.exports = Reaction;
