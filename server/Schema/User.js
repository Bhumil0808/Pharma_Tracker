import mongoose from 'mongoose';

const user = new mongoose.Schema( {
    fullname: {
        type: String,
        required: true,
        trim: true,
        min: 5,
        max: 20
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        min:8,
        validate: {
            validator: function(v) {
                return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(v);
            },
            message: "Please enter a valid password"
        },
        required: [true, "Password required"]
    },
    phone: {
        type: String,
        validate: {
            validator: function(v) {
                return /[0-9]{10}/.test(v);
            },
            message: "Please enter a valid phone"
        },
        required: [true, "Phone required"]
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function(v) {
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message: "Please enter a valid email"
        },
        required: [true, "Email required"]
    },
    shopname:{
        type:String,
        required:true,
        trim:true,
    },
    shopaddress:{
        type:String,
        required:true
    },
    district:{
        type:String,
        required:true
    },
    pincode:{
        type:String,
        required:true
    },
    features:{
        type:String,
        required:true
    }
});


const User=mongoose.model('User', user);

export default User;
