'use strict'

const db = require('../server/db')
const {Monster} = require('../server/db/models')

const monsters = [
  {
    name: 'Fisrt Born',
    imageUrl: '../images/monsters/first_born.png'
  },
  {
    name: 'Baby Boy',
    imageUrl: '../images/monsters/baby_boy.png'
  },
  {
    name: 'Bloody Boob',
    imageUrl: '../images/monsters/bloody_boob.png'
  },
  {
    name: 'Babe',
    imageUrl: '../images/monsters/babe.png'
  },
  {
    name: 'Cutie Pie',
    imageUrl: '../images/monsters/cutie_pie.png'
  },
  {
    name: 'Dr Abs',
    imageUrl: '../images/monsters/dr_abs.png'
  },
  {
    name: 'La Cosa',
    imageUrl: '../images/monsters/la_cosa.png'
  },
  {
    name: 'Nice Lady',
    imageUrl: '../images/monsters/nice_lady.png'
  },
  {
    name: 'Beta Monster',
    imageUrl: '../images/monsters/beta_monster.png'
  },
  {
    name: 'Another Beta Monster',
    imageUrl: '../images/monsters/another_beta_monster.png'
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  await Promise.all(
    monsters.map(monster => {
      return Monster.create(monster)
    })
  )

  console.log(`seeded ${monsters.length} monsters`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
