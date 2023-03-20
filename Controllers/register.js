const bcrypt = require("bcrypt");
const saltRounds = 10;
require('dotenv').config()
const pg = require('pg');
const {getClient} = require('./get-client')
// const client = new pg.Client({
//   host: 'localhost',
//   port: 5432,
//   user: 'rahul1',
//   password: 'rahul1',
//   database: 'rahul'    
// });

// client.connect();

const register = async (req, res) => {
  const { id, password } = req.body;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);
  const query = "INSERT INTO user_password (id, hashed_password) VALUES ($1, $2)";
  // const query = "INSERT INTO user_password (id, salt, hashed_password) VALUES ($1, $2, $3)";
  const values = [id, hashedPassword];
  // const values = [id, salt, hashedPassword];
  const client = await getClient();

  client
  .query(query, values)
  .then(function(result){
    console.log(result);
    res.status(200).send({ message: "User registered successfully." });
  })
  .catch(function(error){
    console.log(error);
    res.status(500).send({ error: "Failed to register user." });
  });
};

module.exports = {
  register
};
