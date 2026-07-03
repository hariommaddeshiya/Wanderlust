const mongoose = require("mongoose");       
const Listing = require("../models/listing.js");      // .. => means one folder up 
const initData = require("./data.js");                 // . =>means current folder
                                                       //  ../../ → two folders up
main().then(()=>{
    console.log("DB is Connected!");
}).catch((err)=>{
    console.log(err);
});


async function main() {
    let MONGO_URL = 'mongodb://127.0.0.1:27017/wanderlust';
    await mongoose.connect(MONGO_URL);
    
}


const initDb = async ()=>{   //async fuction bec. we are inserting many data, may take time 
   await Listing.deleteMany({});
   initData.data = initData.data.map((obj)=> ({...obj, owner: "6a427ba5d388e7d4adf016d2"}));
   await Listing.insertMany(initData.data);
   console.log("Data are initialized");
}; 

initDb();    //calling to initialized the data 