const router = require('express').Router();
const { User } = require('../../models');

//need route to register
router.post('/', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (userData) {
      res
        .status(400)
        .json({ message: 'Username already present in the system. Please try again.' });
      return;
    }

    const registerData = await User.create({
      username: req.body.username,
      password: req.body.password
    });

    req.session.save(() => {
      req.session.user_id = registerData.id;
      req.session.logged_in = true;
      
      res.json({ user: registerData.username, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

//log in and check if all log info exists and is correct
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

//whem logging out check if valid cookie and destroy accordingly
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
