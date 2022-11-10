const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");
const Reaction = require("./Reaction");
const Notification = require("./Notification");

// User to Post - one to many
User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
Post.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// User to Comment - one to many
User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
Comment.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});

// User to Reaction - one to many
User.hasMany(Reaction, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
Reaction.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
});

// User to Notification - one to many
User.hasMany(Notification, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});
Notification.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

// Post to Comment - one to many
// Post.hasMany(Comment, {
//   foreignKey: "post_id",
//   onDelete: "CASCADE",
// });
// Comment.belongsTo(Post, {
//   foreignKey: "post_id",
//   onDelete: "CASCADE",
// });

// // Post to Reaction - one to many
// Post.hasMany(Reaction, {
//   foreignKey: "post_id",
//   onDelete: "CASCADE",
// });
// Reaction.belongsTo(Post, {
//   foreignKey: "post_id",
//   onDelete: "CASCADE",
// });

// // Post to Notification - one to many
// Post.hasMany(Notification, {
//   foreignKey: "post_id",
//   onDelete: "CASCADE",
// });
// Notification.belongsTo(Post, {
//   foreignKey: "post_id",
//   onDelete: "CASCADE",
// });


// // how could you connect commnet and reaction to notification 

// Comment.hasMany(Notification, {
//   foreignKey: "user_id",
//   onDelete: "CASCADE",
// });

// Notification.belongsTo(Comment, {
//     foreignKey: "Comment_id",
//     onDelete: "CASCADE",
//   });


// Notification.belongsTo(Reaction, {
//     foreignKey: "Reaction_id",
//     onDelete: "CASCADE",
//   });




module.exports = {
  User,
  Post,
  Comment,
  Reaction,
  Notification,
};
