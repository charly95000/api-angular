const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id, username: user.username }, 'RANDOM_TOKEN_ACCESS', { expiresIn: '1h' });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id, username: user.username }, 'RANDOM_TOKEN_REFRESH', { expiresIn: '1h' });
};

exports.register = async (req, res) => {
  console.log(req.body)
  const { username, password } = req.body;

  try {
    let user = await User.findOne({ username });
    console.log(user)
    if (user) return res.status(400).json({ message: "User already exists" });

    const hash = await bcrypt.hash(password, 10)

    user = new User({ username, password:hash });
    await user.save();

    res.status(201).json({ message:"inscription réussi" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user || !bcrypt.compare(req.body.password, user.password)) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);


    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true });
    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// exports.signup = (req, res, next) => {
//   console.log(req.body)
//     bcrypt.hash(req.body.password, 10)
//       .then(hash => {
//         const user = new User({
//           email: req.body.email,
//           password: hash
//         });
//         user.save()
//           .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
//           .catch(error => res.status(400).json({ error }));
//       })
//       .catch(error => res.status(500).json({ error }));
//   };

//   exports.login = (req, res, next) => {
//     User.findOne({ email: req.body.email })
//       .then(user => {
//         if (!user) {
//           return res.status(401).json({ error: 'Utilisateur non trouvé !' });
//         }
//         bcrypt.compare(req.body.password, user.password)
//           .then(valid => {
//             if (!valid) {
//               return res.status(401).json({ error: 'Mot de passe incorrect !' });
//             }
//             res.status(200).json({
//               userId: user._id,
//               token: jwt.sign(
//                 { userId: user._id },
//                 'RANDOM_TOKEN_SECRET',
//                 { expiresIn: '24h' }
//               )
//             });
//           })
//           .catch(error => res.status(500).json({ error }));
//       })
//       .catch(error => res.status(500).json({ error }));
//   };

//   exports.getUser = (req, res, next) => {
//     User.findOne({_id: req.params.id}).populate('friends').then(
//       (user) => {
//         res.status(200).json(user);
//       }
//     ).catch(
//       (error) => {
//         res.status(400).json({
//           error: error
//         });
//       }
//     );
//   };