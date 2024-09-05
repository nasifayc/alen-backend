import bcrypt from 'bcryptjs';
import InstitutionModel from '../models/institution.model.js';
import Authentication from './auth.services.js';




class InstitutionService {
    static async registerInstitution(name, email,password, phoneNumber, address, establishmentDate, languageToProvideService, pricePerHour){
        try{
            const newInstitution = new InstitutionModel({
                name, email,password, phoneNumber, address, establishmentDate, languageToProvideService, pricePerHour
            });

            return await newInstitution.save();
        }catch(e){
            throw new Error(`Failed to register Institution ${e}`);
        }
        
    }

    static async loginInstitution(institutionEmail, institutionPassword){
        
        const institution = await InstitutionModel.findOne({email : institutionEmail});
        console.log(institution);
        if (!institution || !(await bcrypt.compare(institutionPassword, institution.password))){
            
            return null;
        }
        const {
            _id,
            name,
            email,
            phoneNumber,
            address,
            establishmentDate,
            languageToProvideService,
            pricePerHour} = institution;

        let tokenData = {
            _id : _id,
            name : name,
            email : email,
            phoneNumber : phoneNumber,
            address : address,
            establishmentDate : establishmentDate,
            languageToProvideService : languageToProvideService,
            pricePerHour : pricePerHour
        }

        
        const SECRET_KEY = process.env.SECRET_KEY || 'secret_key';
        const token = Authentication.generateToken(tokenData,SECRET_KEY,{ expiresIn: '1h' });
        return token; 
    }

    
}

export default InstitutionService;