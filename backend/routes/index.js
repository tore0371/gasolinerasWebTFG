import express from 'express'

// import usersRoute from './user.route.js'
import ddbbRoutes from './ddbb.route.js'


const router = express.Router()

router.use('/ddbb', ddbbRoutes)


export default router
