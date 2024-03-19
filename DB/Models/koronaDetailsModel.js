import mongoose from '../Configration/mongooseConfig.js';
const koronaDetailsdSchema = new mongoose.Schema({


    customerId: {
        type: mongoose.Schema.Types.String,
        ref: 'Customer'
    },
    vaccinationDates: {
        type: [{
            date: Date,
            manufacturer: String
        }],
        validate: [arrayLimit, 'Vaccination dates cannot exceed 4 entries']
    },
    positiveTestDate: Date,
    recoveryDate: Date
});



function arrayLimit(val) {
    return val.length < 4;
}

const koronaDetailsModel = mongoose.model('koronaDetails',koronaDetailsdSchema);
export default koronaDetailsModel;