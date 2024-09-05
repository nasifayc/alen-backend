import bcrypt from 'bcryptjs';
import db from '../config/db.js';

const {Schema} = db;

const adminSchema = new Schema({
    email : {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
    },
    password : {
        type: String,
        required: true,
        unique: true,
    }
});

adminSchema.pre('save', async function (next){
    if(!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

const AdminModel = db.model('admin', adminSchema);

export default AdminModel;