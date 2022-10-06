const router = require('express').Router();
const { User } = require('../models');
const { Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      attributes: { exclude: ['created_at']},
      include: { 
        model: User , 
        attributes: { exclude: ['password']}
      },
      order: [['updated_at', 'ASC']]
    });

    //make sure only pull simple info 
    const post = postData.map((posts) => posts.get({ plain: true }));

    //render handlebars
    res.render('homepage', {
        //what does this do?
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/', withAuth, async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['name', 'ASC']],
    });

    //make sure only pull simple info 
    const users = userData.map((project) => project.get({ plain: true }));

    //render handlebars
    res.render('homepage', {
        //what does this do?
      users,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
    //if user already logged in send him to the homepage
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
