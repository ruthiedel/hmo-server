import express from 'express'
const app = express(); //מופע מסוג הקספרס
const router = express.Router();
import * as customer from '../Controller/customerController.js';
import upload from '../Middleweres/upload.js';

router.get("/",customer.getCustomers)

router.get("/id/:id",customer.getCustomerById)
router.get("/picture/:id",customer.getPicture)
router.post("/",upload.single('picture'),customer.addCustomer)
router.put("/",customer.UpdateCustomer)
router.delete("/id/:id",customer.deleteCustomer)
  
export default router;