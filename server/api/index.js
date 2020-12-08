const router = require('express').Router()
const {Monster} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const monsters = await Monster.findAll()
    console.log(monsters)
    res.json(monsters)
  } catch (err) {
    next(err)
  }
})

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
