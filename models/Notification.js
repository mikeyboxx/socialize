//Import sequelize library/package
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

//Defines 'Comment' as a model
class Notification extends Model {}

//Creates a new model for a Comment
Notification.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    type:{ 
      type: DataTypes.STRING,  // 'comment', 'reaction'
      allowNull: false,
    }, 
    comment_id:{
      type: DataTypes.INTEGER,
      references: {
        model: "comment",
        key: "id",
      },
    },
    reaction_id:{
      type: DataTypes.INTEGER,
      references: {
        model: "reaction",
        key: "id",
      },
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "post",
        key: "id",
      },
    },
    read_flag: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "notification",
  }
);

module.exports = Notification;
