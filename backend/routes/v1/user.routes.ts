import express, { Router } from 'express'
import { createUser, loginUser } from '../../controllers/user.controller'
import { authenticateJwt } from '../../middlewares/auth.middleware'

const router: Router = express.Router()
console.log('user.routes')
router.route('/register').post(createUser)
router.route('/login').post( loginUser)

export default router