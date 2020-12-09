const router = require('express').Router()
const {Monster} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const monsters = await Monster.findAll()
    res.json(monsters)
  } catch (err) {
    next(err)
  }
})

router.post('/', (req, res, next) => {
  try {
    Monster.create(req.body)
    res.json('success')
  } catch (error) {
    next(error)
  }
})

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
