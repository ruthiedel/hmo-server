import express from 'express';
import cors from "cors";
import bodyParser from "body-parser";
import customer from "./Router/customerRouter.js"
import details from './Router/koronaDetailsRouter.js'

const app = express(); //מופע מסוג הקספרסס
const port = 8000;
//מאפשר למשתמש חיצוני ליצא מידע
var corsOptions = {
   origin: "*"
 };
 
 app.use(cors(corsOptions));
 
 // parse requests of content-type - application/json
 app.use(bodyParser.json());
 
 // parse requests of content-type - application/x-www-form-urlencoded
 app.use(bodyParser.urlencoded({
   extended: true
 }));
 



 app.use("/customer",customer)
 app.use("/details",details)


 
 app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)
 })
