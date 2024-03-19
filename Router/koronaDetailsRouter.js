import express from 'express'
const app = express(); //מופע מסוג הקספרסס
const router = express.Router();
import * as details from '../Controller/koronaDetailsController.js';

router.get("/",details.getKoranDeatils)
router.get("/id/:id",details.getDetailsByCustomerId)
router.post("/",details.addKoronaDetails)
router.put("/",details.UpdateDetails)
router.delete("/id/:id",details.deleteKoronaDetails)
  
export default router;