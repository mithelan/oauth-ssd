const passport = require('passport');
const express = require('express');
var router = express.Router();

// router.get('/', function (req, res) {
//   res.render('pages/index.ejs'); 
// });


router.get('/', async (req, res) => {
  const isAuthorized = (req.session);
  if(!isAuthorized) {
      res.render('index', { isAuthorized, id: '' });
  } else {
      try {
          const id = await API.getLinkedinId(req);
          res.render('index', { isAuthorized, id });
      } catch(err) {
          res.send(err);
      }
  }    
});

router.get('/auth', (req, res) => {
  res.redirect(API.getAuthorizationUrl());
});

router.get('/auth/linkedin/callback', async (req, res) => {
  if(!req.query.code) {
      res.redirect('/');
      return;
  }
  try {
      const data = await API.getAccessToken(req);
      if(data.access_token) {
          req.summa=data.access_token
          req.session.token = data.access_token;
          req.session.authorized = true;
      }
      res.redirect('/');
  } catch(err) {
      res.json(err);
  }
});

router.post('/publish', async (req, res) => {
  const { title, text, url, thumb, id } = req.body;
  console.log('title :', title);
  const errors = [];

  if(validator.isEmpty(title)) {
      errors.push({ param: 'title', msg: 'Invalid value.'});
  }
  if(validator.isEmpty(text)) {
      errors.push({ param: 'text', msg: 'Invalid value.'});
  }
  if(!validator.isURL(url)) {
      errors.push({ param: 'url', msg: 'Invalid value.'});
  }
  if(!validator.isURL(thumb)) {
      errors.push({ param: 'thumb', msg: 'Invalid value.'});
  }

  if(errors.length > 0) {
      res.json({ errors });
  } else {
      const content = {
          title: title,
          text: text,
          shareUrl: url,
          shareThumbnailUrl: thumb
      };
      try {
          const response = await API.publishContent(req, id, content);
          res.json({ success: response.content ? 'Post published successfully.' : "Posted" });
      } catch(err) {
          res.json({ error: 'Unable to publish your post.' });
      }
  }
});




router.get('/profile', checkLogin, function (req, res) {
  res.render('pages/profile.ejs', {
    user: req.user 
  });
});

router.get('/auth/linkedin', passport.authenticate('linkedin', {
  scope: ['r_emailaddress', 'r_liteprofile'],
}));

router.get('/auth/linkedin/callback',
  passport.authenticate('linkedin', {
    successRedirect: '/profile',
    failureRedirect: '/login'
  }));

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});


function checkLogin(req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/');
}

module.exports = router;