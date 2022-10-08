const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');


//exclude id's if not needed
router.get('/', async (req, res) => {
  try {
    const allPostsData = await Post.findAll({
      order: [['updatedAt', 'DESC']],
      attributes: { exclude: ['createdAt'] },
      //can include multiple tables at the same level in the same include
      include: [{
        model: User,
        attributes: { exclude: ['password'] }
      },
      {
        model: Comment,
        order: [['updatedAt', 'DESC']],
        attributes: { exclude: ['createdAt'] },
        //can nest includes as well
        include: {
          model: User,
          attributes: { exclude: ['password'] }
        }
      }]
    });

    // res.status(200).json(allPostsData);
    //make sure only pull simple info 
    //got rid of map in the breakout room, because its only ?
    // multiple objects so have to map
    const posts = allPostsData.map((post) => post.get({ plain: true }));
    // const posts = allPostsData.get({ plain: true });


    // //render handlebars
    res.render('homepage', {
      posts, //spread operator used to send each one of the propertities
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const dashboardData = await Post.findAll({
      order: [['updatedAt', 'DESC']],
      attributes: { exclude: ['createdAt'] },
      where: {
        user_id: req.session.user_id //how to pull
      },
      include: [{
        model: User,
        attributes: { exclude: ['password'] }
      },
      {
        model: Comment,
        order: [['updatedAt', 'DESC']],
        attributes: { exclude: ['createdAt'] },
        //can nest includes as well
        include: {
          model: User,
          attributes: { exclude: ['password'] }
        }
      }]
    });

    //make sure only pull simple info 
    const posts = dashboardData.map((post) => post.get({ plain: true }));

    //render handlebars
    res.render('dashboard', {
      //what does this do?
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err.message);
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
