import bcrypt from 'bcryptjs';
import AdminModel from '../models/admin.model.js';
import Authentication from './auth.services.js';

class AdminService {
    static async registerAdmin(email, password) {
        try{
            const newAdmin = new AdminModel({
                email,
                password
            });

            return await newAdmin.save();
        }catch(e){
            throw new Error(`Failed to register admin ${e}`);
        }
    }

    static async loginAdmin(adminEmail, adminPassword) {
        const admin = await AdminModel.findOne({email : adminEmail});

        if(!admin || !(await bcrypt.compare(adminPassword, admin.password))){
            return null;
        }

        const{_id, email} = admin;

        let tokenData = {
            _id : _id,
            email : email,
        }

        const SECRET_KEY = process.env.SECRET_KEY || 'secret_key';
        const token = Authentication.generateToken(tokenData,SECRET_KEY,{expiresIn: '20s'});
        return token;
    }
}

export default AdminService;