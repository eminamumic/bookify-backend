const express = require('express')
const router = express.Router()
const authenticateToken = require('../middlewares/authMiddleware')

router.get('/dashboard', authenticateToken, (req, res) => {
  res.json({ message: `Dobrodošli, korisniče sa ID: ${req.user.id}` })
})

module.exports = router
