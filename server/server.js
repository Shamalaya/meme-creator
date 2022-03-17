'use strict';
const express = require('express');
const morgan = require('morgan');
const { check, validationResult } = require('express-validator');
const passport = require('passport');
const memeDao = require('./meme-dao');

const userDao = require('./user-dao'); // module for accessing the users in the DB
const app = express();
const session = require('express-session'); // enable sessions
const port = 3001;
const LocalStrategy = require('passport-local').Strategy; // username and password for login

/*** Set up Passport ***/
// set up the "username and password" login strategy
// by setting a function to verify username and password
passport.use(new LocalStrategy(
  function (username, password, done) {
    userDao.getUser(username, password).then((user) => {
      if (!user)
        return done(null, false, { message: 'Incorrect username and/or password.' });

      return done(null, user);
    })
  }
));

// serialize and de-serialize the user (user object <-> session)
// we serialize the user id and we store it in the session: the session is very small in this way
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// starting from the data in the session, we extract the current (logged-in) user
passport.deserializeUser((id, done) => {
  userDao.getUserById(id)
    .then(user => {
      done(null, user); // this will be available in req.user
    }).catch(err => {
      done(err, null);
    });
});

//  middleware
app.use(morgan('dev'));
app.use(express.json());


// custom middleware: check if a given request is coming from an authenticated user
const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated())
    return next();

  return res.status(401).json({ error: 'Not authenticated' });
}

// set up the session
app.use(session({
  // by default, Passport uses a MemoryStore to keep track of the sessions
  secret: '- lorem ipsum dolor sit amet -',
  resave: false,
  saveUninitialized: false
}));


// then, init passport
app.use(passport.initialize());
app.use(passport.session());



//  Define routes and web pages

/*** MEME APIs ***/

// GET /api/memes
app.get('/api/memes', (req, res) => {
  if (req.isAuthenticated()) {
    memeDao.listMemes()
      .then(memes => res.json(memes))
      .catch(() => res.status(500).end());
  }
  else {
    memeDao.listPublicMemes()
      .then(memes => res.json(memes))
      .catch(() => res.status(500).end());
  }
});


// GET /api/templates
app.get('/api/templates', (req, res) => {
  memeDao.listTemplates()
    .then(templates => res.json(templates))
    .catch(() => res.status(500).end());
});

// POST /api/memes
app.post('/api/memes', isLoggedIn, [
  check('title').isLength({ min: 1, max: 50 }),
  check('text').isArray({ min: 3, max: 3 }),
  check('templateId').isInt(),
  check('font').isIn(['Arial', 'Verdana']),
  check('protected').isBoolean(),
  check('color').isIn(["Black", "Blue", "Red", "Green"])

], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors)
    return res.status(422).json({ errors: errors.array() });
  }

  const meme = {
    userId: req.user.id,
    userName: req.user.name,
    templateId: req.body.templateId,
    title: req.body.title,
    protected: req.body.protected,
    text: req.body.text,
    font: req.body.font,
    color: req.body.color
  };
  try {
    const result = await memeDao.createMeme(meme);
    res.json(result);
  } catch (err) {
    res.status(503).json({ error: `Database error during the creation of new meme: ${err}.` });
  }
});

// DELETE /api/memes/:id
app.delete('/api/memes/:id',
  isLoggedIn,
  [check('id').isInt()],
  async (req, res) => {
    try {
      await memeDao.deleteMeme(req.user.id, req.params.id);
      res.status(200).json({});
    } catch (err) {
      res.status(503).json({ error: `Database error during the deletion of meme ${req.params.id}` });
    }
  });
/*** USER APIs ***/


// Login --> POST /sessions
app.post('/api/sessions', function (req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
    if (!user) {
      // display wrong login messages
      return res.status(401).json(info);
    }
    // success, perform the login
    req.login(user, (err) => {
      if (err)
        return next(err);

      // req.user contains the authenticated user, we send all the user info back
      // this is coming from userDao.getUser()
      return res.json(req.user);
    });
  })(req, res, next);
});



// Logout --> DELETE /sessions/current 
app.delete('/api/sessions/current', (req, res) => {
  req.logout();
  res.end();
});

// GET /sessions/current
// check whether the user is logged in or not
app.get('/api/sessions/current', (req, res) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
  }
  else
    res.status(401).json({ error: 'Unauthenticated user!' });;
});


//  Activate server
app.listen(port, () =>
  console.log('Server ready'));