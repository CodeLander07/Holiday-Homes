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
    const modifiedData = initdata.data.map((obj) => ({...obj, owner:"6920a2afd86430113fd47d21"}));
    await Listing.insertMany(modifiedData);
    console.log('Database initialized with sample data');

}

initDB();


// {
//   "_id": {
//     "$oid": "6920a2afd86430113fd47d21"
//   },
//   "email": "Mayurnikumbh2004@gmail.com",
//   "username": "mayurnikumbh",
//   "salt": "5edc3caf5cc3fb895e015c4350a3021bc348cddbce66b8270fbdd841affba4d8",
//   "hash": "5f54967891da5ac6f33625bccbc9f78dce6746bc36964dba7324b2aac6b9dd89b1ef92155cfd3bae4ed98b1e4e3faed4d67f591b77df5b589bc41adcaaef623a84338e9f55039d3bc18422c507dffd3e4a2e047288aac561c9347d13c7fce4d8214d8c421812f21ff9d88bca686426f6177e21b36a586ba441440d1c4067a9dc71ae64e09b6eaee5045d4e1bf70fc6acb750f12994fdf5ed606c4b540aff74aa1227240f4a0c719f4e80417ce381dce6cfb9ee051ee78306e5b620f1d4e6d339a620a30adba7415e1efcc24b36e25ab353dd09cd53330632cde98258364c8559ff0964be1a2a80d72ec3a6834d22ba732529af6238fca959ec9fc41b5f404f73ffe7b07007709b47c3f214b39748bbcffa646a4dd865f5c255b071ec3476f3e59b2a74a6c6efc640ca429461ec88b23599644a8cdf877b28630365882b012ff0f688caa8b72b503369a8e7fa4b57b8501b2567d3752fa1e0c091ac9dc25058f8f041a0d065ad6874b57904956b009c7ba1bb4ce49807ace079a706a4b92748c6a47f570acfff81c1774c5b06715faef99b2799977546cad36e8e4119018d7af0aebe23c23c78d911234594bce42f95d6c497e253c4b40bf9daff6fb19b6db9026cbe295cbb3d01411c07ccf681e5283ed5bf115a88a48503a8c079f1f839a02c88cb94165ab5de31ea6388924bd2b6c528ae0011d19e4268916c3287add528cd",
//   "__v": 0
// }