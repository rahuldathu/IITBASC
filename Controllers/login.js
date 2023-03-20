const bcrypt = require("bcrypt");
require('dotenv').config()
const pg = require('pg');
const {getClient} = require('./get-client')
// const session = require('express-session')



const getUser = async (id, cb) => {
  const query = "SELECT * FROM user_password WHERE id = $1";
  const values = [id];
  try {
  //   setTimeout(async function(){
  //     const result = await client.query(query, values);
  //     cb(null, result.rows[0]);
  //   },3000);
    const client = await getClient();
    console.log(client)
    const result = await client.query(query, values);
    cb(null, result.rows[0]);
  } catch (error) {
    cb(error);
  }
};

const login = async (req, res) => {
  const { id, password } = req.body;
  getUser(id, async (error, user) => {
    if (error) {
      res.status(500).send({ error: "Failed to retrieve user." });
    } else if (!user) {
      res.status(404).send({ error: "User not found." });
    } else {
      const hashedPassword = user.hashed_password;
      if (bcrypt.compareSync(password, hashedPassword)) {
        console.log(req.session.user)
        req.session.user = id;
        console.log(req.session.user)
        res.status(200).send({ message: "User logged in successfully." });
      } else {
        res.status(401).send({ error: "Incorrect password." });
      }
    }
  });
};

module.exports = {
  login
};
