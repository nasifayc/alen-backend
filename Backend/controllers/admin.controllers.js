import AdminService from '../services/admin.services.js';

export async function registerAdmin(req, res) {
    try {
        const { email, password } = req.body;
        
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

        const result = await AdminService.registerAdmin(email, password);
        res.status(201).json(result);


    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export async function loginAdmin(req, res) {
    try{
        const {email, password} = req.body;
        const token = await AdminService.loginAdmin(email, password);
        if(!token){
            return res.status(401).json({error:'Invalid credential'});
        }

        res.status(200).json({status: true, token: token});
    }catch(err){
        res.status(500).json({error: `Internal server error ${err.message}`});
    }
}