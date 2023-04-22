import express from 'express'
import { getRotulos } from '../controllers/graficas.controller.js'
import { getProvincias } from '../controllers/graficas.controller.js'
import { getPieData } from '../controllers/graficas.controller.js'
import { getBarData } from '../controllers/graficas.controller.js'
import { getLineData } from '../controllers/graficas.controller.js'

const router = express.Router()


router
    .route('/getRotulos/:provincia')
    .get(getRotulos)

router
    .route('/getProvincias')
    .get(getProvincias)

router
    .route('/getPieData/:provincia')
    .get(getPieData)

router
    .route('/getBarData')
    .post(getBarData)

router
    .route('/getLineData')
    .post(getLineData)



export default router