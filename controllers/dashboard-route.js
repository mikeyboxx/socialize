const router = require('express').Router();
const withAuth = require('../middleware/auth');
const { User, Post } = require('../models');



router.get('/:id', async (req, res) => {
    console.log("uihwehiuefhwef!!!!!")
    try {
        const posts = await Post.findAll({
            where: {
                user_id: req.params.id
            },
            include: [{
                model: User,
                attributes: ['username'],

            }],

            order: [['createdAt', 'DESC']],
            // attributes: ['id', 'content', 'createdAt']
        });

        // res.json(posts);
        console.log(posts)
        res.render('dashboard', {
            loggedIn: req.session.logged_in,
            title: 'Your Dashboard',
            posts: posts
            // .map(post => post.get(({ plain: true })))
        });

    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});




module.exports = router;
