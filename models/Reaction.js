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
        // ???????
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
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "reaction",
  }
);

module.exports = Reaction;
