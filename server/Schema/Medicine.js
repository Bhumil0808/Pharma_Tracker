import mongoose from 'mongoose';

const medicine = new mongoose.Schema( {
    name:{
        type: String,
        required: true,
        trim:true
    },
    quantity:{
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
        index: true,
        lowercase: true
    }
});


const Medicine=mongoose.model('medicine', medicine);

export default Medicine;