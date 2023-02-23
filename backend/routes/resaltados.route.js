import express from 'express'
import {getTablePrecios} from "../controllers/resaltados.controller.js"


const router = express.Router()


router
    .route('/getTablePrecios')
    .get(getTablePrecios)


export default router