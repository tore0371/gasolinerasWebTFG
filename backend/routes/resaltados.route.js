import express from 'express'
import { getTablePreciosGasoleoA, getTablePreciosGasoleoB, getTablePreciosGasoleoPremium,
    getTablePreciosGasolina95, getTablePreciosGasolina98, getTableGasolineras } from "../controllers/resaltados.controller.js"


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

router
    .route('/getTablePreciosGasolina95')
    .get(getTablePreciosGasolina95)

router
    .route('/getTablePreciosGasolina98')
    .get(getTablePreciosGasolina98)

router
    .route('/getGasolineras')
    .get(getTableGasolineras)



export default router