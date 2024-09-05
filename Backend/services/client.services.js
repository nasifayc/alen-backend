import bcrypt from 'bcryptjs';
import ClientModel from '../models/client.model.js';
import Authentication from './auth.services.js';



class ClientService{
    static async registerClient(username, email,password, emergencyContact, fullName,phoneNumber, dateOfBirth, nationality, residency, isAnonymous,journals){
        try{
            const existingUser = await ClientModel.findOne({ $or: [{ username }, { email }] });
            if (existingUser) {
                throw new Error('Username or email already exists');
            }
            const newClient = new ClientModel({
                username,
                email,
                password,
                emergencyContact,
                fullName,
                phoneNumber,
                dateOfBirth,
                nationality,
                residency,
                isAnonymous,
                journals
            });
            return await newClient.save();
        }catch(e){
            throw new Error(`Failed to register Client ${e}`);
        }
    }

    static async loginClient(clinetUsername, clientPassword){
        const client = await ClientModel.findOne({username: clinetUsername});
        console.log(client);
        if (!client || !(await bcrypt.compare(clientPassword, client.password))) {
            return null;
        }

        console.log()

        const {
            _id,
            username,
            email,
            emergencyContact,
            fullName,
            phoneNumber,
            dateOfBirth,
            nationality,
            residency,
            isAnonymous,
            journals

        } = client;

        let tokenData = {
            _id: _id,
            username: username,
            email: email,
            emergencyContact: emergencyContact,
            fullName: fullName,
            phoneNumber: phoneNumber,
            dateOfBirth: dateOfBirth,
            nationality: nationality,
            residency: residency,
            isAnonymous: isAnonymous,
            journals: journals
        }

        const SECRET_KEY = process.env.SECRET_KEY || 'secret_key';
        const token = Authentication.generateToken(tokenData,SECRET_KEY,{expiresIn: '1h'});
        return token; 
    }

    static async addJournal(clientId, journalData) {
        try {
            const client = await ClientModel.findById(clientId);
            if (!client) throw new Error('Client not found');
            client.journals.push(journalData);
            await client.save();
            return client;
        } catch (e) {
            throw new Error(`Failed to add journal: ${e.message}`);
        }
    }

    static async getJournals(clientId) {
        try {
            const client = await ClientModel.findById(clientId).populate('journals');
            if (!client) throw new Error('Client not found');
            return client.journals;
        } catch (e) {
            throw new Error(`Failed to get journals: ${e.message}`);
        }
    }

    static async updateJournal(clientId, journalId, updatedData) {
        try {
            const client = await ClientModel.findById(clientId);
            if (!client) throw new Error('Client not found');

            const journal = client.journals.id(journalId);
            if (!journal) throw new Error('Journal not found');

            journal.set(updatedData);
            await client.save();
            return journal;
        } catch (e) {
            throw new Error(`Failed to update journal: ${e.message}`);
        }
    }

    static async deleteJournal(clientId, journalId) {
        try {
            const client = await ClientModel.findById(clientId);
            if (!client) throw new Error('Client not found');
    
           
            const initialJournalCount = client.journals.length;
            client.journals = client.journals.filter(journal => journal._id.toString() !== journalId);
            
            if (initialJournalCount === client.journals.length) throw new Error('Journal not found');
            
            await client.save();
            return true;
        } catch (e) {
            throw new Error(`Failed to delete journal: ${e.message}`);
        }
    }
    

    
}

export default ClientService;