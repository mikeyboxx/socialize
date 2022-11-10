const router = require('express').Router();

// // Signup route
// router.get('/', (req, res) => {
//   // If the user has already signed up, redirect to the homepage
//   if (req.session.loggedIn) {
//     res.redirect('/');
//     return;
//   }

//   // Otherwise, render the 'login' template
//   res.render('signup', {
//     loggedIn: req.session.loggedIn, 
//     title: 'Socialize',
//   });
// });

module.exports = router;