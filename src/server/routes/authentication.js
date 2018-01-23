const router = require('express').Router()
const { addUser, verifyUser, updateProfile, getgetgetUserById,  } = require('../../model/db/users')
const { sessionChecker, hashPassword, comparePassword } = require('./utils')


router.get('/signup', (req, res) => {
  res.render('signup')

})

router.post('/signup', (req, res) => {
  const { fullName, email, password, city } = req.body
  hashPassword(password).then((hashedPassword) => {
    addUser(fullName, email, hashedPassword, city)
      .then((user) => {
        if (user) {
          req.session.user = user
          return res.redirect(`/profile/${user.id}`)
        }

      })
      .catch(console.error)
    })
})

router.get('/login', (req, res) => {
  res.render('login')

})

router.post('/login', (req, res) => {
  const { email, password } = req.body
  verifyUser(email)
    .then((user) => {
      comparePassword(password, user.password)
        .then((isValid) => {
          if (isValid) {
            req.session.user = user
            return res.redirect(`/profile/${user.id}`)
          } else {
            return res.redirect('/login')
          }

        })
    })
    .catch(console.error)
})

module.exports = router