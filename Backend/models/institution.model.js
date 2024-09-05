import bcrypt from 'bcryptjs';
import db from '../config/db.js';

const {Schema} = db;

const institutionSchema = new Schema({
    name: {
        type: String,
        unique: true,
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
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    establishmentDate: {
        type: Date,
        required: true,
    },
    languageToProvideService: {
        type: String,
        required: true,
    },
    pricePerHour: {
        type: Number,
        required: true,
    }
});

institutionSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

const InstitutionModel = db.model('institution', institutionSchema);

export default InstitutionModel;