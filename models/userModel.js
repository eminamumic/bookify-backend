const db = require('../config/db')

const createUser = async (name, email, hashedPassword) => {
  const [result] = await db.execute(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, hashedPassword]
  )
  return result
}

const findUserByEmail = async (email) => {
  const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [
    email,
  ])
  return rows[0]
}

module.exports = {
  createUser,
  findUserByEmail,
}
