import express from 'express'
import { getAllGasolineras } from '../controllers/DBquery.js'
import { getAllDaylyDAta } from '../controllers/ddbb.controller.js'

const router = express.Router()


router
    .route('/')
    .get(getAllDaylyDAta)
export default router




