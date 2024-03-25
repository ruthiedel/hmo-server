import makeToken from '../Middleweres/userToken.js'
import userModel from '../DB/Models/userModel.js'
import nodemailer from 'nodemailer';
import {emailPassword} from '../../secret.js'

   
async function addUser(req,res)
{
    let u = req.body;
    const token = makeToken(u); 
    let user = new userModel(u)
    try {
        let data = await userModel.findOne({email:req.body.email});
        console.log(data);
        if(!data)
        {
           await user.save(); 
           sendEmail(req.body.email,req.body.role)
           res.status(200).send({user:user,token:token}).end()
        }
        else
        {
            res.status(500).send("adduser failed because this user is allready in the DB")
        }
    } 
    catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
    
}
async function verefyUser(req,res)
{
    try {
        let data = await userModel.find({email:req.body.email,pin:req.body.pin});
        
        if(data.length === 0)
        {
          res.status(404).send("user is not in access");
        }
        else
        {
              const token = makeToken(data[0])
              res.send({user:data[0],token:token});
        }
      } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
      }
}

function sendEmail(name , role)
{
// Create a transporter object
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'r0525610179@gmail.com',
    pass: emailPassword
  }
});

// Define the email options
const mailOptions = {
  from: 'r0525610179@gmail.com',
  to:  'r0525610179@gmail.com',
  subject:"security test",
  text: name+" signin to the web sit as a "+role
};

// Send the email
transporter.sendMail(mailOptions, function(error, info) {
  if (error) {
    res.status(500).send(error);
  } else {
    res.send('Email sent:');
  }
})
}
 export{
          addUser,
          verefyUser
       }