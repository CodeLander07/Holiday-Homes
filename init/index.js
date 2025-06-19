const mongoose  = require('mongoose');
const initdata = require('./data.js');
const Listing = require('../models/listing.js');

require('dotenv').config();
const MONGOURL = "mongodb+srv://mayurnikumbh2004:Mayur%402004@cluster0.zevirxf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

main()
.then(() =>{
    console.log('Connected to MongoDB');
})
.catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); });

async function main() {

    await mongoose.connect(MONGOURL);
    
}

const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initdata.data);
    console.log('Database initialized with sample data');

}

initDB();