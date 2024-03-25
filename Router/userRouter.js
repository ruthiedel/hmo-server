import express from 'express'
const app = express(); //מופע מסוג הקספרסס
const router = express.Router();
import * as user from '../Controller/userController.js';

router.post("/",user.addUser)
router.post("/login",user.verefyUser)
  
export default router;