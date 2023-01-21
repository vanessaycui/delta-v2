const User = require('../../models/user')
const jwt = require("jsonwebtoken")

const bcrypt = require('bcrypt');

module.exports = {
    create,
    login,
    checkToken
}
async function create(req, res) {
    try {
      // Add the user to the database
      const user = await User.create(req.body);
      // token will be a string
      const token = createJWT(user);
      // Yes, we can use res.json to send back just a string
      // The client code needs to take this into consideration
      res.status(200).json(token);
    } catch (err) {
      // Client will check for non-2xx status code 
      // 400 = Bad Request
      res.status(400).json(err);
    }
  }

  async function login(req,res){
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) throw new Error();
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) throw new Error();
      const token = createJWT(user)
      res.status(200).json( token );
    } catch {
      res.status(400).json('Bad Credentials');
    }
  }

  async function checkToken(req,res){
    console.log('req.user', req.user)
    res.status(200).json(req.exp)
  }

/*-- Helper Functions --*/

function createJWT(user) {
    return jwt.sign(
      // data payload
      { user },
      process.env.SECRET,
      { expiresIn: '24h' }
    );
  }
  