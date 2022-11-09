const sequelize = require("../config/connection");
const User = require("../models/User");
const Post = require("../models/Post");
const userSeeds = require("./user-seeds.json");
const postSeeds = require("./post-seeds.json");

const seedDatabase = async() => {
  try {
    await sequelize.sync({force: true})

    await User.bulkCreate(userSeeds, {
        individualHooks: true, 
        returning: true
    });

    await Post.bulkCreate(postSeeds, {
        individualHooks: true, 
        returning: true
    }); 




    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};



seedDatabase();