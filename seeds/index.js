const sequelize = require("../config/connection");
const {
    User,  
    Post,  
    Comment,  
    Reaction,
    Notification  
} = require("../models");
const userSeeds = require("./user-seeds.json");
const postSeeds = require("./post-seeds.json");
const commentSeeds = require("./comment-seeds.json");
const reactionSeeds = require("./reaction-seeds.json");
const notificationSeeds = require("./notification-seeds.json");

const seedDatabase = async() => {
  try {
    await sequelize.sync({force: true})

    await User.create({
      first_name: "bot",
      last_name: "bot",
      username: "bot",
      email: "bot@bot.com",
      password: "botbotbot"
    },{
      individualHooks: true, 
      returning: true
    });

    await User.bulkCreate(userSeeds, {
        individualHooks: true, 
        returning: true
    });

    await Post.bulkCreate(postSeeds, {
        returning: true
    }); 

    await Comment.bulkCreate(commentSeeds, {
        returning: true
    }); 

    await Reaction.bulkCreate(reactionSeeds, {
        returning: true
    }); 

    await Notification.bulkCreate(notificationSeeds, {
        returning: true
    }); 

    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

seedDatabase();