import AwarenessModel from '../models/awareness.model.js';

class AwarenessService {
    static async createAwareness(title, content, image, createdDate, source) {
        try{
            const newAwareness = new AwarenessModel({
                title,
                content,
                image,
                createdDate,
                source
            });

            return await newAwareness.save();
        }catch(e){
            throw new Error(`Failed to create awareness : ${e.message}`);
        }
    }

    static async getAllAwarenesses() {
        try{
            const awarenesses = AwarenessModel.find();
            return awarenesses;
        }catch(e){
            throw new Error(`Failed to get all awarenesses : ${e.message}`);
        }
    }

    static async getAwarenessById(awarenessId) {
        try{
            const awareness = await AwarenessModel.findById(awarenessId );
            return awareness;
        }catch(e){
            throw new Error(`Failed to get awareness by ID : ${e.message}`);
        }
    }

    static async updateAwareness(awarenessId, updatedFields) {
        try{
            const awareness = await AwarenessModel.findByIdAndUpdate(awarenessId,updatedFields, { new: true, runValidators: true });
            return awareness;
        }catch(e){
            throw new Error(`Failed to update awareness : ${e.message}`);
        }
    }


    static async deleteAwareness(awarenessId) {
        try{
            const awareness = await AwarenessModel.findByIdAndDelete(awarenessId );
            return awareness;
        }catch(e){
            throw new Error(`Failed to delete awareness : ${e.message}`);
        }
    }

}


export default AwarenessService;