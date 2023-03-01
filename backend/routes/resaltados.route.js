import express from 'express'
import { getTablePreciosGasoleoA, getTablePreciosGasoleoB, getTablePreciosGasoleoPremium } from "../controllers/resaltados.controller.js"


const router = express.Router()


router
    .route('/getTablePreciosGasoleoA')
    .get(getTablePreciosGasoleoA)

router
    .route('/getTablePreciosGasoleoB')
    .get(getTablePreciosGasoleoB)

router
    .route('/getTablePreciosGasoleoPremium')
    .get(getTablePreciosGasoleoPremium)



export default router