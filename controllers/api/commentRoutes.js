const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//add comments
router.get('/', async (req, res) => {
    try {
      const commentData = await Comment.findAll();
      res.json(commentData)
  
    } catch (err) {
      res.status(400).json(err);
    }
  });

//add comments
router.post('/', withAuth, async (req, res) => {
    try {
      const commentData = await Comment.create({
        comment: req.body.comment,
        user_id: req.session.user_id,
        post_id: req.body.post_id
      });

      res.json(commentData)
  
    } catch (err) {
      res.status(400).json(err);
    }
  });

  module.exports = router;