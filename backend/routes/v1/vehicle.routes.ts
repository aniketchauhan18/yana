import express, { Router } from 'express'
import { getVehicle, getVehicles, registerVehicle, updateVehicle, deleteVehicle } from '../../controllers/vehicle.controller'
import { authenticateJwt } from '../../middlewares/auth.middleware'

const router: Router = express.Router()

router.route('/').get(authenticateJwt,getVehicles);
router.route('/:id').get(authenticateJwt,getVehicle);
router.route('/register').post(authenticateJwt,registerVehicle);
router.route('/update/:id').put(authenticateJwt,updateVehicle);
router.route('/delete/:id').delete(authenticateJwt,deleteVehicle);

export default router