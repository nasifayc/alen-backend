import db from '../config/db.js';

const {Schema} = db;
const EventSchema = new Schema({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    date: {
      type: Date, 
      required: true
    },
    time: {
      type: String, 
      required: true
    },
    image: {
      type: String,
      default: null 
    },
    organizer: {
      type: String, 
      required: true
    },
    location : {
        type: String, 
        required: true
    },
    rsvps: [{
      type: String, // Array of user IDs who have RSVP'd
      default: []
    }]
  });


const EventModel = db.model('event', EventSchema);
  export default EventModel;