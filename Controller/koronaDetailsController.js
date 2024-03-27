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
    console.log(req.params.id)
    let data = await koronaDetailsModel.findOne({customerId:req.params.id});
       
    if(!data)
    {
      res.status(500).send("deatails are not in access")
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
    if ((!req.body.positiveTestDate || !req.body.recoveryDate) || (new Date(req.body.positiveTestDate) < new Date(req.body.recoveryDate))) {
        await koronaDetailsModel.updateOne({customerId: req.body.customerId}, req.body);

         res.send(data);
    }
    else{
      res.status(400).send("Positive test date must be before recovery date");
    }
  }
} catch (error) {
  console.log(error);
  res.status(500).send('Internal Server Error');
}
}


async function addKoronaDetails(req, res) {
  let details = req.body;

  try {
      let newDetails = new koronaDetailsModel(details);
      let customerData = await customersModel.findOne({ idNumber: req.body.customerId });
      if (customerData) {
          let existingDetails = await koronaDetailsModel.findOne({ customerId: req.body.customerId });
          if (!existingDetails) {
            if ((!details.positiveTestDate || !details.recoveryDate) ||
            (new Date(details.positiveTestDate) < new Date(details.recoveryDate)))  {
                  await newDetails.save();
                  res.status(200).send('Add details success').end();
              } else {
                  res.status(400).send("Positive test date must be before recovery date");
              }
          } else {
              res.status(409).send("Add details failed because there are details already in the DB");
          }
      } else {
          res.status(404).send("Add details failed because there is no matching customer in the DB");
      }
  } catch (error) {
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