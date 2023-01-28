import express from 'express'
import { getTodayData, getTodayMeanDataPerProvince } from '../controllers/mapa.controller.js'


const router = express.Router()

router
    .route('/getTodayData')
    .get(getTodayData)

router
    .route('/getTodayMeanDataPerProvince')
    .get(getTodayMeanDataPerProvince)


export default router