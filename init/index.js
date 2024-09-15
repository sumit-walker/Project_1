const mongoose=require('mongoose');
const initData=require('./data.js');
const Listing=require('../models/listing.js');

const MONGO_URL='mongodb://127.0.0.1:27017/wanderlust';
main().then((res)=>{
    console.log("connection successfull");
})
.catch((err)=>console.log("err".err));

async function main(){
    await mongoose.connect(MONGO_URL);
}

const initDB=async ()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({...obj,owner:'66d3051f8e34ff1777e2ef9e'}))
    await Listing.insertMany(initData.data);
    console.log("data was insitalized");
}

initDB();


