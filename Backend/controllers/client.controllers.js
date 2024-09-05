
import ClientService from '../services/client.services.js';
import { decode } from 'jsonwebtoken';

export async function registerClient(req, res) {
    try {
        const { username, email,password, emergencyContact, fullName, phoneNumber, dateOfBirth, nationality, residency, isAnonymous, journals} = req.body;
        if (!username || username.trim() === '') {
            return res.status(400).json({ error: 'Username is required.' });
        }
        if (!email || email.trim() === '') {
            return res.status(400).json({ error: 'Email is required.' });
        }

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            return res.status(400).json({ error: 'Invalid email format.' });
        }
        
        if (!emergencyContact || emergencyContact.trim() === '') {
            return res.status(400).json({ error: 'Emergency contact is required.' });
        }

        if (!password || password.trim() === '') {
            return res.status(400).json({ error: 'Password is required.' });
        }

        if (password.length < 8) {
            return res.status(400).json({ error: 'Password must be at least 8 characters long.' });
            
        }
        if (!/[a-z]/.test(password)) {
            return res.status(400).json({ error: 'Password must include at least one lowercase letter.' });
        }
        if (!/[A-Z]/.test(password)) {
            return res.status(400).json({ error: 'Password must include at least one uppercase letter.' });
        }
        if (!/\d/.test(password)) {
            return res.status(400).json({ error: 'Password must include at least one number.' });
        }
        if (!/[@$!%*?&]/.test(password)) {
            return res.status(400).json({ error: 'Password must include at least one special character.' });
        }
        
        const result = await ClientService.registerClient(
            username.trim(),
            email.trim().toLowerCase(),
            password.trim(),
            emergencyContact.trim(),
            fullName ? fullName.trim() : null,
            phoneNumber ? phoneNumber.trim() : null,
            dateOfBirth ? new Date(dateOfBirth) : null,
            nationality ? nationality.trim() : null,
            residency ? residency.trim() : null,
            isAnonymous,
            journals
        );

        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function loginClient(req,res) {
    try {
        const {username, password} = req.body;
        const token = await ClientService.loginClient(username, password);

        if(!token){
            return res.status(401).json({error: 'Invalid username or password'});
        }

        res.status(200).json({status: true, token:token, tokenData: decode(token)});
    } catch (e) {
        res.status(500).json({error: `Internal server error ${err.message}`});
    }
 
}

export async function addJournal(req, res) {
    try {
        const { clientId } = req.query;
        const journalData = req.body;
        const result = await ClientService.addJournal(clientId, journalData);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function getJournals(req, res) {
    try {
        const { clientId } = req.query;
        const journals = await ClientService.getJournals(clientId);
        res.status(200).json(journals);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function updateJournal(req, res) {
    try {
        const { clientId, journalId } = req.query;
        const updatedData = req.body;
        const updatedJournal = await ClientService.updateJournal(clientId, journalId, updatedData);
        res.status(200).json(updatedJournal);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function deleteJournal(req, res) {
    try {
        const { clientId, journalId } = req.query;
        const result = await ClientService.deleteJournal(clientId, journalId);
        res.status(200).json({ success: result });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}


