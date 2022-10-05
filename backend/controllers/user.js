const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Controller signup
exports.signUp = (req, res) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          pseudo: req.body.pseudo,
          email: req.body.email,
          password: hash,
          isAdmin: false
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };

// Controller login
exports.signIn = (req, res) => {
  User.findOne({ email: req.body.email })
      .then(user => {
          if (!user) {
              return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});
          }
          bcrypt.compare(req.body.password, user.password)
              .then(valid => {
                  if (!valid) {
                      return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' });
                  }
                  res.status(200).json({
                      userId: user._id,
                      token: jwt.sign(
                        { userId: user._id },
                        'RANDOM_TOKEN_SECRET'
                        // expiresIn: '24h'
                    ),
                      pseudo: user.pseudo
                  });
              })
              .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};


//getUser
exports.getUser = (req, res) => {
  User.findOne({ _id: req.auth.userId })
  .then(user => res.status(200).json(user))
  .catch(error => res.status(404).json({ error }));
}