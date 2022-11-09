const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");
const Reaction = require("./Reaction");
const Notification = require("./Notification");

User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Post.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

Post.hasMany(Reaction, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

Reaction.belongsTo(Post, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

Reaction.belongsTo(Post, {
    foreignKey: "post_id",
    onDelete: "CASCADE",
  });
  
Comment.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
  });


Reaction.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
  });



module.exports = {
  User,
  Post,
  Comment,
  Reaction,
  Notification,
};
