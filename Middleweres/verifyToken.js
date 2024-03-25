import jwt  from "jsonwebtoken";
import { TokenPassword } from "../../secret.js"

const verifyUserToken = (req, res, next) => {

const token = req.body.token || req.query.token || req.headers["authorization"];
if (!token) {
  return res.status(401).send(" unauthorized ,A token is required for authentication");
}
try {
  const decoded = jwt.verify(token, TokenPassword);
  req.user = decoded;
}
 catch (err) {
  console.log(err)
  return res.status(200).send("Invalid Token");
}
return next();
};



const verifyDoctorToken = (req, res, next) => {

  const token = req.body.token || req.query.token || req.headers["authorization"];
  if (!token) {
    return res.status(401).send(" unauthorized ,A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, TokenPassword);
    req.user = decoded;
    // Check the role of the user
    if ( decoded.role !== 'doctor') {
      return res.status(400).send("Forbidden. Only doctors are allowed.");
  }
  }
   catch (err) {
    console.log(err)
    return res.status(400).send("Invalid Token");
  }
  return next();
  };
  


 export {
  verifyDoctorToken,verifyUserToken
 }