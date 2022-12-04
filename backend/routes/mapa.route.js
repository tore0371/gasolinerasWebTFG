import express from 'express'
import {getTodayData} from '../controllers/mapa.controller.js'


const router = express.Router()

router
    .route('/getTodayData')
    .get(getTodayData)


export default router