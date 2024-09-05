import EventModel from '../models/event.model.js';

class EventService{
    static async createEvent(title, description, date, time, image, organizer, location, rsvps){
        try{
            const newEvent = new EventModel({
                title,
                description,
                date,
                time,
                image,
                organizer,
                location,
                rsvps,
            });
    
    
            return await newEvent.save();
        }catch(e){
            throw new Error(`Error creating event: ${e.message}`);
        }
        

    }
    static async getEvents(){
        try{
            const events = await EventModel.find();
            return events;
        }catch(e){
            throw new Error(`Error getting events: ${e.message}`);
        }
    }
      
    static async getEventById(eventId){
        try{
            const  event = await EventModel.findById(eventId);
            return event;
        }catch(e){
            throw new Error(`Error getting event by ID: ${e.message}`);
        }
    }  
    
     static async updateEvent(id, updatedFields){
        try{
            const event = await EventModel.findByIdAndUpdate(id, updatedFields, { new: true, runValidators: true });
            return event;
        }catch(e){
            throw new Error(`Error updating event: ${e.message}`);
        }
     }

     static async deleteEvent(id){
        try{
            const event = await EventModel.findByIdAndDelete(id);
            return event;
        }catch(e){
            throw new Error(`Error deleting event: ${e.message}`);
        }
     }
    
    static async rsvpEvent(eventId, userId){ 
        try{
            const event = await EventModel.findById(eventId);
            if(!event){
                return null;
            }

            if(!event.rsvps.includes(userId)){
                event.rsvps.push(userId);
                await event.save();
                return event;
            }else{
                throw new Error('User Already RSVP');
            }
        }catch(e){
            throw new Error(`Error rsvping event: ${e.message}`);
        }
    }

    static async unrsvpEvent(eventId, userId){ 
        try{
            const event = await EventModel.findById(eventId);
            if(!event){
                return null;
            }

            if(event.rsvps.includes(userId)){
                event.rsvps = event.rsvps.filter(id => id!== userId);
                await event.save();
                return event;
            }else{
                throw new Error('User Not RSVP');
            }
        }catch(e){
            throw new Error(`Error unrsvping event: ${e.message}`);
        }
        
    }
}

export default EventService;