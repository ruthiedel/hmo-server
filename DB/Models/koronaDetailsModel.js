import mongoose from '../Configration/mongooseConfig.js';
import {validDate} from './validations.js'
const koronaDetailsSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.String,
        ref: 'Customer'
    },
    vaccinationDates: {
        type: [{
            date: {
                type: Date,
                validate: {
                    validator: validDate,
                    message: 'Date must be lower than today'
                }
            },
            manufacturer: String
        }],
        validate: {
            validator: arrayLimit,
            message: 'Vaccination dates cannot exceed 4 entries'
        }
    },
    positiveTestDate: {
        type: Date,
        validate: {
            validator: validDate,
            message: 'Date must be lower than today'
        }
    },
    recoveryDate: {
        type: Date,
        validate: {
            validator: validDate,
            message: 'Date must be lower than today'
        }
    }
});

function arrayLimit(val) {
    return val.length <= 4;
}


const koronaDetailsModel = mongoose.model('koronaDetails',koronaDetailsSchema);
export default koronaDetailsModel;