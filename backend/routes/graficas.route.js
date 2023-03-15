import express from 'express'
import getRotulos from '../controllers/graficas.controller.js'

const router = express.Router()


router
    .route('/getRotulos')
    .get(getRotulos)



export default router