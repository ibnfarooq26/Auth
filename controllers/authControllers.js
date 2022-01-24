const jwt = require("jsonwebtoken");
const User = require("../models/User");
const handleError = require("../error/error");
const maxAge = 3 * 24 * 60 * 60;


module.exports.signup_get = (req, res) => {
  res.render("signup");
};
module.exports.login_get = (req, res) => {
  res.render("login");
};
module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    User.create({ email, password })
      .then((user) => {
        const token=createToken(user._id);
        res.cookie('jwt', token, { maxAge:maxAge*1000}) 
        res.status(200).json({ user });
    })
      .catch((err) => {
        const errors = handleError(err);
        res.json({ errors });
      });
  } catch (err) {
    const errors = handleError(err);
    res.json({ errors });
  }
};
module.exports.login_post = (req, res) => {
  const { email, password } = req.body;
  try {
    User.login(email, password)
      .then((user) => {
        const token=createToken(user._id);
        res.cookie('jwt', token, { maxAge:maxAge*1000})
        res.status(200).json({ user });
      })
      .catch((err) => {
        const errors = handleError(err);
        res.json({ errors });
      });
  } catch (err) {
    const errors = handleError(err);
    res.json({ errors });
  }
};
module.exports.authenticate=(req,res,next)=>{
  const token= req.cookies.jwt;
  if (token){
    jwt.verify(token, process.env.SECRET_KEY, function (err, decoded){
      console.log(decoded);
      const {id}=decoded;
      
    User.findById(id).then ( user=>{
    user? next(): res.redirect('/login')
    }).catch (err=>{
      console.log(err);
    })

      next();
      if (err){
        res.send('err in verifying token')
        res.redirect('/login')
        
      }
    })
  } else {
    res.redirect('/login')
  }
}


const createToken = (id) => {
const token = jwt.sign({id}, process.env.SECRET_KEY, { expiresIn: maxAge });
  return token;
};


