const express = require('express')
const cors = require('cors')
const authRoutes = require('./controllers/routes/authRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)

app.use('/api/user', userRoutes)

app.get('/', (req, res) => {
  res.send('Dobrodošli na Bookify API!')
})

app.listen(PORT, () => {
  console.log(`Server radi na http://localhost:${PORT}`)
})
