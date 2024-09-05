import BlacklistModel from "../models/blackList.model.js";
import jwt from 'jsonwebtoken';

export async function authenticateToken(req, res, next) {
  try{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
  
    if (!token) return res.status(401).json({error: 'Access denied'});
  
    const blacklisted = await BlacklistModel.findOne({ token });
    if (blacklisted) return res.status(403).json({error: 'Invalid token'});
    const SECRET_KEY = process.env.SECRET_KEY;
  
    jwt.verify(token, SECRET_KEY, async (err, user) => {
      if (err){
        const expiresAt = new Date(jwt.decode(token).exp * 1000);
        const blacklistedToken = new BlacklistModel({ token, expiresAt });
        await blacklistedToken.save();

        return res.status(403).json({error: 'Sorry, Your Session is Expired!'});
      } 
      req.user = user;
      next();
    });
  }catch (err) {
    return res.status(500).json({error: 'Internal Server Error'});
  }  
}



  