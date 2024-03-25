import mongoose from '../Configration/mongooseConfig.js';
import israelIdValidator from 'identity-number-validator'
import {phone} from 'phone'
import { isValidIsraeliID ,isValidMobile,isValidPhone,validDate} from './validations.js';

const customersSchema = new mongoose.Schema({
    idNumber:{
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: isValidIsraeliID,
            message: 'ID is not valid 😡'
        }
    },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    phone: {
        type: String,
        validate: {
            validator: isValidPhone,
            message: 'Phone number must be a valid Israeli landline phone number in the format 03-5740510'
        }
    },
    mobile:{
        type: String,
        required: true,
        validate: {
            validator: isValidMobile,
            message: 'Phone number must be a valid Israeli phone number'
        }
    },
    picture:String,
    address: {
        type: {
            city: String,
            street: String,
            houseNumber: {
                type: Number,
                min: 1
            }
        }
    },
    birthDay: {
        type: Date,
        required: true,
        validate: {
            validator: validDate,
            message: 'Birthday must be before today'
        }
    }
},{ versionKey: false });


const customersModel = mongoose.model("customer",customersSchema);
export default customersModel;
