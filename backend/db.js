const mongoose = require('mongoose');

const dotenv = require('dotenv');
dotenv.config();

// connecting to the Database . 
mongoose.connect(process.env.DATABASE_URI);


const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;


// User Schema

const userSchema = new Schema({
    email : { type: String, required: true, unique: true },
    password: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
})

// Session Schema 

const sessionSchema = new Schema({
    user_id: { type: ObjectId, ref: 'User', required: true },
    title : { type: String, required: true },
    tags : { type: [String], required: true },
    json_file_url : { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
})


const Usermodel = mongoose.model('User', userSchema);
const Sessionmodel = mongoose.model('Session', sessionSchema);
module.exports = { Usermodel, Sessionmodel };