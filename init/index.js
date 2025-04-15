const mongoose  = require('mongoose');
const initdata = require('./data.js');
const Listing = require('../models/listing.js');


const MONGOURL = "mongodb://127.0.0.1:27017/wanderlust";

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