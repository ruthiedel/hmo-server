import mongoose from '../Configration/mongooseConfig.js';
import israelIdValidator from 'identity-number-validator'
import {phone} from 'phone'


const customersSchema = new mongoose.Schema({
    // idNumber:{
    //     type:String,
    //     required: true,
    //     validate: {
    //       validator: function(v) {
    //         // Check if ID number is 9 digits long
    //         if (!/^\d{9}$/.test(v)) {
    //           return false;
    //         }
    
    //         // Check if ID number is valid using israel-id-validator library
    //         return israelIdValidator.isValid(v);
    //       },
    //       message: props => `${props.value} is not a valid Israeli ID number`
    //     }
    // },
    idNumber:String,
    firstName:String,
    lastName:String,
    phone:String,
    mobile:String,
    picture:String,
    address:
    {
        type:{
        city:String,
        street:String,
        houseNuber:String
        }
    },
    birthDate: Date,
})




const customersModel = mongoose.model("customer",customersSchema);
export default customersModel;
