import mongoose from 'mongoose'

const Organization = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SignUp'
    },
    OrganizationName:{
        type : String,
        requireq: true,
        unique: true
    },
    OrganizationWebsite:{
        type : String,
        requireq: true,
        unique: true
    },
    OrganizationPhone:{
        type : Number,
        requireq: true,
        unique: true
    },
    isActive: {
        type : Boolean,
        requireq: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
})

const OrganizationModel = mongoose.model("Organization", Organization);

export default OrganizationModel;