var express = require('express');
var router = express.Router();
const User = require('../model/User')
const myLogger = require('../utils/myLogger')
const jwt = require('jsonwebtoken')
const authenMiddleWare = require('../middleware/AuthenticationMiddleWare')

/* GET users listing. */
router.get('/', async (req, res) => {
  try {
    myLogger.info('Get all users')
    const users = await User.find()
    res.json(users)
  } catch (error) {
    res.json({message : error.message})
  }
})

router.post('/', async (req, res) =>{
  try {
    myLogger.info('Save user data')
    const saveData = new User(req.body)
    res.json(await saveData.save())
  } catch (error) {
    res.json({message : error.message})
  }
})

router.delete('/:id', async (req, res) => {
  try {
    myLogger.info('remove user ')
    const result = await User.findByIdAndRemove(req.params.id)
    res.json(result)
  } catch (error) {
    res.json({message : res.message})
  }
})
//

router.patch('/', authenMiddleWare ,async (req, res) => {
  try {
    myLogger.info('update user from DB ')
    const userInfo = req.user?.data[0]
    const result = await User.findByIdAndUpdate(userInfo['_id'], req.body)
    res.json(result)
  } catch (error) {
    res.json({message : error.message})
  }
})

// get user by id

router.get('/user', authenMiddleWare ,async(req, res) => {
  try {
    myLogger.info('get user info ')
    res.json(req.user)
  } catch (error) {
    res.error({message : error.message})
  }  
})

// login with user

router.post('/login', async (req, res) =>{
  try {
    myLogger.info('user login')
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.find({username : username, password : password})
    if(user != null) {
      delete user['password']
      const token = jwt.sign({
        exp : Math.floor(Date.now() / 1000) + (60 * 60),
        data : user,
      }, process.env.JWT_SCRETE_KEY)
      res.json({
        userInfo : user,
        jwtToken : token
      })
    }



  } catch (error) {
    res.json({message : error.message})
  }
})

module.exports = router;
