import koronaDetailsModel from "../DB/Models/KoronaDetailsModel.js";
import customersModel from "../DB/Models/CustomerModel.js";

async function getKoranDeatils(req, res) {
    try {
      let data = await koronaDetailsModel.find({});
      res.send(data);
    } 
    catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error From get-details');
    }
  }


async function getDetailsByCustomerId(req,res)
{
  try {
    
    let data = await koronaDetailsModel.findOne({customerId:req.params.id});

    if(!data)
    {
      res.status(404).send("deatails are not in access")
    }
    else{
    res.send(data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error From get-customer-by-id');
  }
}




async function UpdateDetails(req,res)
{


try {
  let data = await koronaDetailsModel.findOne({customerId:req.body.customerId});
  
  if(!data)
  {
  
    res.status(404).send("details are not in access")
  }
  else{
    await koronaDetailsModel.updateOne({customerId: req.body.customerId}, req.body);

     res.send(data);
  }
} catch (error) {
  console.log(error);
  res.status(500).send('Internal Server Error');
}
}


async function addKoronaDetails(req,res)
{
    let details = req.body;

    try {
      let newdetails = new koronaDetailsModel(details)
      let data = await customersModel.findOne({idNumber:req.body.customerId});
      if(data)
      {
       
        let data = await koronaDetailsModel.findOne({customerId:req.body.customerId})
        if(!data)
        {
            await newdetails.save(); 
            res.status(200).send('add details success').end()
        }
        else{
          res.status(500).send("add details failed because tere are details  already in the DB")
        }
      }
      else
      {
        res.status(500).send("add details failed because tere is no fited customer in the DB") 
      }
  } 
  catch (error) {
      console.log(error);
      res.status(500).send('Internal Server Error From Add-Details');
  }
}
async function deleteKoronaDetails(req,res)
{
  try{
      await koronaDetailsModel.deleteOne({customerId:req.params.id})
      res.send("remove details successed")
  }
  catch(error)
  {

   res.status(500).send('Internal Server Error From delete details');
  }
}



export{
  getDetailsByCustomerId,
  addKoronaDetails,
  UpdateDetails,
  deleteKoronaDetails,
  getKoranDeatils
}