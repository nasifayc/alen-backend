import bcrypt from 'bcryptjs';
import ProfessionalModel from '../models/profession.model.js';
import Authentication from './auth.services.js';


class ProfessionService{
    static async registerProfession(name,email,password, phoneNumber, dateOfBirth, nationality, address, profession, experience,  languageToProvideService, pricePerHour,rating, verificationStatus, licenseUrl){
        try{
            const existingUser = await ProfessionalModel.findOne({ $or: [{ phoneNumber }, { email }] });
            if (existingUser) {
                throw new Error('Phone number or email already exists');
            }
            const newProfessional = new ProfessionalModel({name,email,password, phoneNumber, dateOfBirth, nationality, address, profession, experience,  languageToProvideService, pricePerHour, rating, verificationStatus, licenseUrl});
            return await newProfessional.save();
        }catch(e){
            throw new Error(`Failed to register Profession ${e}`);
        }
    }

    static async loginProfessional(professionalsPhone, professionalsPassword){
        const professional = await ProfessionalModel.findOne({phoneNumber: professionalsPhone});
        if(!professional || !(await bcrypt.compare(professionalsPassword, professional.password))){
            return null;
        }

        const { 
            _id,
            name,
            email,
            phoneNumber,
            dateOfBirth,
            nationality,
            address,
            profession,
            experience,
            languageToProvideService,
            pricePerHour,
            rating,
            verificationStatus,
            licenseUrl} = professional;

        let tokenData = {
            _id : _id,
            name : name,
            email : email,
            phoneNumber : phoneNumber,
            dateOfBirth : dateOfBirth,
            nationality : nationality,
            address : address,
            profession : profession,
            experience : experience,
            languageToProvideService : languageToProvideService,
            pricePerHour : pricePerHour,
            rating : rating,
            verificationStatus : verificationStatus,
            licenseUrl : licenseUrl
        };

        // console.log(tokenData);

        const SECRET_KEY = process.env.SECRET_KEY || 'secret_key';
        const token = Authentication.generateToken(tokenData,SECRET_KEY,{ expiresIn: '1h' });
        return token;
    }

    static async updateProfessional(professionalId, updateData) {
        try {
            // If updating the password, hash the new password
            if (updateData.password) {
                const salt = await bcrypt.genSalt(10);
                updateData.password = await bcrypt.hash(updateData.password, salt);
            }

            const updatedProfessional = await ProfessionalModel.findByIdAndUpdate(professionalId, updateData, { new: true });

            return updatedProfessional;
        } catch (e) {
            throw new Error(`Failed to update Professional ${e}`);
        }
    }

    
}

export default ProfessionService;