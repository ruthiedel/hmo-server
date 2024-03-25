import express from 'express'
const app = express(); //מופע מסוג הקספרסס
const router = express.Router();
import * as details from '../Controller/koronaDetailsController.js';
import * as  VerifyToken  from '../Middleweres/verifyToken.js'

router.get("/",details.getKoranDeatils)
router.get("/id/:id",details.getDetailsByCustomerId)
router.post("/",VerifyToken.verifyDoctorToken,details.addKoronaDetails)
router.put("/",VerifyToken.verifyDoctorToken,details.UpdateDetails)
router.delete("/id/:id",VerifyToken.verifyDoctorToken,details.deleteKoronaDetails)
  
export default router;