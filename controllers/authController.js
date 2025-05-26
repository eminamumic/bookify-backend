const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const register = async (req, res) => {
  const { name, email, password } = req.body

  try {
    const existingUser = await User.findUserByEmail(email)
    if (existingUser)
      return res.status(400).json({ message: 'Email već postoji' })

    const hashedPassword = await bcrypt.hash(password, 10)
    await User.createUser(name, email, hashedPassword)

    res.status(201).json({ message: 'Korisnik uspješno registrovan' })
  } catch (err) {
    res.status(500).json({ message: 'Greška na serveru', error: err.message })
  }
}

const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findUserByEmail(email)
    if (!user)
      return res.status(400).json({ message: 'Neispravan email ili lozinka' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return res.status(400).json({ message: 'Neispravan email ili lozinka' })

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    })

    res.json({ message: 'Uspješno prijavljen', token })
  } catch (err) {
    res.status(500).json({ message: 'Greška na serveru', error: err.message })
  }
}

module.exports = {
  register,
  login,
}
