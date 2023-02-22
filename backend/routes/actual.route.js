import express from 'express'
import {getTodayDataTable} from '../controllers/actual.controller.js'


const router = express.Router()



router
    .route('/getTodayDataTable')
    .get(getTodayDataTable)


export default router