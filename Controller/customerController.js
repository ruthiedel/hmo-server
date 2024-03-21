import customerModel from "../DB/Models/CustomerModel.js";
import koronaDetailsModel from "../DB/Models/KoronaDetailsModel.js";
import path from 'path';
import fs from 'fs'
async function getCustomers(req, res) {
  try {
    let data = await customerModel.find({});
    res.send(data);
  } 
  catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error From get-customers');
  }
}

async function getCustomerById(req,res)
{
  try {
    console.log(req.params.id)
    let data = await customerModel.findOne({idNumber:req.params.id});

    if(!data)
    {
      res.status(500).send("customer is not in access")
    }
    else{
    res.send(data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error From get-customer-by-id');
  }
}




async function UpdateCustomer(req,res)
{
  console.log("sfgh")
try {
  console.log("sfgh")

  let data = await customerModel.findOne({idNumber:req.body.idNumber});
  console.log(data)
  if(!data)
  {
  
    res.status(5000).send("customer is not in access")
  }
  else{
    await customerModel.updateOne({idNumber: req.body.idNumber}, req.body);

     res.send(data);
  }
} catch (error) {
  console.log(error);
  res.status(500).send('Internal Server Error');
}
}


async function addCustomer(req,res)
{
    let customer = req.body;
    try {
      let newcustomer = new customerModel(customer)
      let data = await customerModel.findOne({idNumber:req.body.idNumber});
    
      if(!data)
      {
       
         await newcustomer.save(); 
         res.status(200).send('add customer success').end()
      }
      else
      {
          res.status(500).send("addcustomer failed because this customer is already in the DB")
      }
  } 
  catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error From Add-Customer');
  }
}


async function getPicture(req,res)
{
  try{
    let data = await customerModel.findOne({idNumber:req.params.id})
    if(!data)
    {
      res.send(" not in access");
    }
    else
    {
      try{
        console.log(data)
      res.set('Content-Type', 'image/jpg');
      res.sendFile(path.resolve('./pictures/' + data.picture));
    }
    catch(error)
    {
      console.log(error)
      res.status(500).send("There was a problem loading the picture");
    }
      
    }
  }
  catch(error)
  {
    res.status(500).send('Internal Server Error');
  }
}


async function deleteCustomer(req,res)
{
  try{
      let data = await koronaDetailsModel.findOne({customerId:req.params.id})
      if(data)
      {
        await koronaDetailsModel.deleteOne({customerId:req.params.id}) 
      }
     
      await customerModel.deleteOne({idNumber:req.params.id})
      res.send("remove customer successed")
  }
  catch(error)
  {

   res.status(500).send('Internal Server Error');
  }
}



export{
  getCustomerById,
  getCustomers,
  addCustomer,
  UpdateCustomer,
  deleteCustomer,
  getPicture
}