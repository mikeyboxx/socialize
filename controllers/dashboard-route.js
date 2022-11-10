const express = require('express')
const router = express.Router()

// middleware that is specific to this router
router.use((req, res, next) => {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', (req, res) => {
  res.send('Dashboard home page')
})
res.json(null)
res.json({ user: 'tobi' })
res.status(500).json({ error: 'message' })

module.exports = router