import jwt from 'jsonwebtoken';
class Authentication {
    static generateToken(tokenData, secretKey, options){
        return jwt.sign(tokenData, secretKey, options);
    }
}

export default Authentication;