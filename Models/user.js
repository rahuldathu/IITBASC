const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const getUser = async (id, cb) => {
  const query = "SELECT * FROM user_password WHERE id = $1";
  const values = [id];
  try {
    const result = await pool.query(query, values);
    cb(null, result.rows[0]);
  } catch (error) {
    cb(error);
  }
};

const comparePassword = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};

module.exports = {
  getUser,
  comparePassword
};


// not imported anywhere just ignore