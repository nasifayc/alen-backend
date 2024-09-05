import bcrypt from 'bcryptjs';
import db from '../config/db.js';

const {Schema} = db;

const professionalSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        unique: true,
        default: null,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    nationality: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    profession: {
        type: String,
        required: true,
    },
    experience: {
        type: Number,
        required: true,
    },
    languageToProvideService: {
        type: String,
        required: true,
    },
    pricePerHour: {
        type: Number,
        required: true,
    },
    rating : {
        type: Number,
        required: true,
    },
    verificationStatus: {
        type: String,
        required: true
    },
    licenseUrl: {
        type: String,
        default: null, 
    }
});

professionalSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

const ProfessionalModel = db.model('professional', professionalSchema);

export default ProfessionalModel;