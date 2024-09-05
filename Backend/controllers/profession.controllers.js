import ProfessionService from '../services/profession.services.js';

export async function registerProfession(req, res) {
    try {
       
        const {
            name,
            email,
            password,
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
            licenseUrl
        } = req.body;

        if (!/^\S+@\S+\.\S+$/.test(email)) {
            return res.status(400).json({ error: 'Invalid email format.' });
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

        const result = await ProfessionService.registerProfession(
            name.trim(),
            email.trim().toLowerCase(),
            password.trim(),
            phoneNumber.trim(),
            new Date(dateOfBirth),
            nationality.trim(),
            address.trim(),
            profession.trim(),
            Number(experience),
            languageToProvideService.trim(),
            Number(pricePerHour),
            Number(rating),
            verificationStatus.trim(),
            licenseUrl
        );

        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}


export async function loginProfessional(req, res) {
    try{
        const{phoneNumber, password} = req.body;
        const token = await ProfessionService.loginProfessional(phoneNumber, password);

        if(!token){
            return res.status(401).json({error: 'Invalid phoneNumber or password'});
        }

        res.status(200).json({status: true, token: token});

    }catch(e){
        res.status(500).json({error : `Internal server error ${err.message}`});
    }
}

export async function updateProfessional(req, res) {
    try {
        const {id} = req.query;
        const updateData = req.body;

       

        const updatedProfessional = await ProfessionService.updateProfessional(id, updateData);

        if (!updatedProfessional) {
            return res.status(404).json({ error: 'Professional not found' });
        }

        res.status(200).json(updatedProfessional);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}