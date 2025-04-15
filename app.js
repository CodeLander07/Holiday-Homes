const express = require('express');
const mongoose = require('mongoose');
const Listing = require('./models/listing.js');
const app = express();

//momgodb connection string
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

app.listen(3000, () => {
    console.log('Server is running on port 3000');
} );

app.get('/', (req, res) => {    
    res.send('Hello World!');
});

app.get('/testListing', async (req, res) => {
    let sampleListing = new Listing({
        title: 'Eagle Palace',
        description: 'Best Hotel in Pachora',
        price: 100,
        location: 'Jalgoan',
        country: 'India'
    });

    await sampleListing.save();
    console.log('Listing saved:', sampleListing);
    res.send('Listing saved!');
});