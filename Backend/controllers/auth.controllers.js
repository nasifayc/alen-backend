import { decode } from 'jsonwebtoken';
import BlacklistModel from '../models/blackList.model.js';
export async function logout(req, res) {
    try {
        const token = req.headers['authorization'].split(' ')[1];
        const decoded = decode(token);
      
        const expiresAt = new Date(decoded.exp * 1000);
      
        const blacklistedToken = new BlacklistModel({ token, expiresAt });
        await blacklistedToken.save();
      
        res.status(200).json({success:'Logged out successfully'});
    } catch (err) {
        res.status(500).json({ error: `Failed to log out: ${err.message}` });
    }
}

export async function verifyToken(req, res) {
    res.status(200).json({success:'Token is valid'});
}
