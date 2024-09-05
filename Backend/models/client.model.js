import bcrypt from 'bcryptjs';
import db from '../config/db.js';

const {Schema} = db;


const journalSchema = new Schema({
    date: {
      type: Date,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    isFavorite: {
      type: Boolean,
      default: false,
    },
    color: {
        type: String,
        required: true,
        default: '#FFFFFF',
      }
  });

const clientSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']
    },
    emergencyContact: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        default: null,
    },
    phoneNumber: {
        type: String,
        default: null,
    },
    dateOfBirth: {
        type: Date,
        default: null,
    },
    nationality: {
        type: String,
        default: null,
    },
    residency: {
        type: String,
        default: null,
    },
    isAnonymous: {
        type: Boolean,
        required: true,
    },
    journals: [journalSchema]
});


clientSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});



const ClientModel = db.model('client', clientSchema);

export default ClientModel;