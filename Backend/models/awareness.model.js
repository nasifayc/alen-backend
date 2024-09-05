import db from '../config/db.js';

const {Schema} = db;

const awarenessSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: null,
    },
    createdDate: {
        type: Date,
        required: true,
    },
    source: {
        type: String,
        required: true,
    },
});

const AwarenessModel = db.model('awareness', awarenessSchema);

export default AwarenessModel;