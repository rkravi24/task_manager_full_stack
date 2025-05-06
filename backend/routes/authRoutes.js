const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const isAuth = require('../middleware/isAuth');

router.post('/login', authController.login);
router.post('/register', authController.register);
router.post('/logout', authController.logout);


router.get('/dashboard', isAuth, (req, res) => {
  res.json({
    msg: `Welcome to your dashboard, ${req.session.user.email}!`,
    user: req.session.user
  });
});


router.get('/protected', isAuth, (req, res) => {
  res.json({ msg: `Welcome ${req.session.user.email}` });
});


module.exports = router;
