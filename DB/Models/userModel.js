import mongoose from '../Configration/mongooseConfig.js';
import validator from 'validator';
const { isEmail } = validator;

const userSchema = new mongoose.Schema({

    name:String,
    email:{
    type:String,
    unique: true,
    required:true,
    minlength: 11,
    validate: [isEmail, 'email is not valid 😡']
},
   
    pin:String,
    role: {
        type: String,
        enum: ['user', 'doctor'],
        default: 'user' // Optional: Set a default value if not provided
    }
})

const userModel = mongoose.model("users",userSchema);
export default userModel;


