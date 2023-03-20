const bcrypt = require("bcrypt");
require('dotenv').config()
const pg = require('pg');
const {getClient} = require('./get-client')


// (async () => {
//   const client = new pg.Client({
//   host: process.env.PG_HOST,
//   port: process.env.PG_PORT,
//   user: process.env.PG_USER,
//   password: process.env.PG_PASSWORD,
//   database: process.env.PG_DATABASE,  
// });
// console.log(client)
// await client.connect();
// })




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
        req.session.user = id;
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
