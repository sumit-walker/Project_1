const Listing=require('../models/listing.js');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken=process.env.MAP_TOKEN;
const geocodingClient =mbxGeocoding({ accessToken: mapToken });


//Index Controller
module.exports.index=async(req,res)=>{
    const listing=await Listing.find();
    res.render("listing/index.ejs",{listing});
};


// new controller
module.exports.newListing=(req,res)=>{

    res.render("listing/new.ejs"); 
}


// show Controller
module.exports.showListing=async(req,res)=>{
    

    let {id}=req.params;
    const list=await Listing.findById(id).populate(
        {
            path:"reviews",
            populate:{path:"author"}
        }
    ).populate('owner');

    if(!list){
        req.flash("err","Listing are you requesting for is nor exist any more");
        res.redirect("listing");

    }
    
    res.render("listing/show.ejs",{list});
}


//create controller
module.exports.createListing=async(req,res,next)=>{
    let response=await geocodingClient.forwardGeocode({
        query: req.body.location,
        limit: 1
      })
        .send()
        

    let url=req.file.path;
    let filename=req.file.filename;
    const newListing=new Listing(req.body);
    
    console.log(req.body)

    newListing.owner=req.user._id;
    newListing.image={url,filename};
    newListing.geometry=response.body.features[0].geometry

    let saveListing=await newListing.save()
    console.log(saveListing);
    req.flash("success","New Listing Created");

    res.redirect('/listing');
    
}


// Get Edit Controller
module.exports.getEditListing=async(req,res)=>{
    const {id}=req.params;
    
    let list=await Listing.findById(id)
    req.flash("success","Listing edited");
    
    // let originalImageUrl=Listing.image.url;
    // originalImageUrl.replace('/upload','/upload/h_300/w_250')

    res.render("listing/edit.ejs",{list});
}

//Put Edit Controller
module.exports.putEditListing=async(req,res)=>{

    let response=await geocodingClient.forwardGeocode({
        query: req.body.location,
        limit: 1
      })
        .send()

    let { id } = req.params;
    let listing=await Listing.findByIdAndUpdate(id, { ...req.body });
    if(typeof req.file !=="undefined"){
        let url=req.file.path;
        let filename=req.file.filename;
    
        listing.image={url,filename};
        
    }
    listing.geometry=response.body.features[0].geometry
    await listing.save()

    req.flash("success","Listing Updated");

    res.redirect(`/listing/${id}`);
  
  
    
    
}


//Delete Controller
module.exports.deleteListing=async(req,res)=>{
    const {id}=req.params;

    let remove=await Listing.findByIdAndDelete(id);
    remove.save()
    .then((res)=>{
        console.log(res);
    })
    .catch((err)=>{
        console.log("error",err);
    });
    req.flash("success","Listing Deleted");
    
    res.redirect(`/listing`);

}