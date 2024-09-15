const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const review=require("./reviews.js");

const listingSchema= new Schema({
    customId: String,
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    image:{
        
        filename:{
            type:String,
            // default:"listingimage",
        },
        url:{
            type:String,
            // required:true,
            // set:(v)=> v===""?
            // "https://images.unsplash.com/photo-1719931626206-d3874333fd00?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            // :v
        },
    },
    price:{
        type:Number,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true,
    },

    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    geometry:{
        type:{
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
        
    },
    category:{
        type:String,
        // enum:["Farms","cave","beach","Mansion","Doms","island","Tree house","Rooms","Tinny home","amzing pool","National parks","Historical house","mountain","river"]
    }
});


//delete review when listing is deleting
listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        await review.deleteMany({_id:{$in:listing.reviews}});
    }
})

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;


