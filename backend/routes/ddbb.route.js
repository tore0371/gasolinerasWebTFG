import express from 'express'
import { getAllDaylyDAta } from '../controllers/ddbb.controller.js'

const router = express.Router()


router
    .route('/:municipio')
    .get(getAllDaylyDAta)


export default router




