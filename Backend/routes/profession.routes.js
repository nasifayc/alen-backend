import { Router } from 'express';
const router = Router();
import ProfessionalModel from "../models/profession.model.js";

import { registerProfession, loginProfessional, updateProfessional } from '../controllers/profession.controllers.js';

router.post('/registerProfession', registerProfession);
router.post('/loginProfessional', loginProfessional);
router.get('/professionalList', async(req,res)=>{
    try{
        const professionals = await ProfessionalModel.find();
        res.json(professionals)
}catch(err){
    res.status(500).json({message: err.message});
}}
);

router.put('/updateProfessional', updateProfessional);

export default router;