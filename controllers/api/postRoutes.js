const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');


//view all posts
router.get('/', async (req, res) => {
    try {
      const postData = await Post.findAll();
      res.json(postData)
  
    } catch (err) {
      res.status(400).json(err);
    }
  });

//add post
router.post('/', withAuth, async (req, res) => {
    try {
      const postData = await Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id
      });
      res.status(200).json(postData)
    } catch (err) {
      res.status(400).json(err);
    }
  });


//updating post
router.put('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.update(
          {
            title: req.body.title,
            content: req.body.content,
          },
          {
            where: { id: req.params.id },
          }
        );
        if (!postData) {
          res.status(404).json({ message: 'No post found with this id!' });
          return;
        }
    
        res.status(200).json(postData);
      } catch (err) {
        res.status(500).json(err);
      }
  });

  //delete post
  router.delete('/:id', withAuth, async (req, res) => {
    // delete a category by its `id` value
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
  });

module.exports = router;