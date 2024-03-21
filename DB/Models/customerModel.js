import mongoose from '../Configration/mongooseConfig.js';
import israelIdValidator from 'identity-number-validator'
import {phone} from 'phone'


const customersSchema = new mongoose.Schema({
    idNumber:{
        type: String,
        required: true,
        unique: true // Assuming id should be unique
    },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    phone:String,
    mobile:String,
    picture:String,
    address:
    {
        type:{
        city:String,
        street:String,
        houseNumber:{
            type: Number,
            min: 1
        }
        }
    },
    birthDate:{
        type:Date,
        required:true
    } ,
},{ versionKey: false })




const customersModel = mongoose.model("customer",customersSchema);
export default customersModel;
