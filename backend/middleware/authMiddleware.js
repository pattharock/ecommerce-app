import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import expressHandler from 'express-async-handler'

const protect = expressHandler(async (req, res, next) => {
  let token

  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).select('-password')

      next()
    } catch(error){
      console.error(error)
      res.status(401)
      throw new Error('not authorized, token failed')
    }
    // console.log('token found')
  }

  if(!token) {
    res.status(401)
    throw new Error('Not authorised, no token')
  }
})

export default protect