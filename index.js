import express from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import customer from "./Router/customerRouter.js"
import details from './Router/koronaDetailsRouter.js'
import user from './Router/userRouter.js'
import * as  VerifyToken  from './Middleweres/verifyToken.js'

const app = express(); //מופע מסוג הקספרסס
const port = 8000;
//מאפשר למשתמש חיצוני ליצא מידע
var corsOptions = {
   origin: "http://localhost:3000",
   allowedHeaders: ["Authorization", "Content-Type"],
   };
 
 app.use(cors(corsOptions));
 
 // parse requests of content-type - application/json
 app.use(bodyParser.json());
 
 // parse requests of content-type - application/x-www-form-urlencoded
 app.use(bodyParser.urlencoded({
   extended: true
 }));
 

 app.use("/user",user)

 app.use("/customer",VerifyToken.verifyUserToken,customer)
 app.use("/details",details)


 
 app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
 })
