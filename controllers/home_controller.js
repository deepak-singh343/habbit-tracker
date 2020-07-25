const Habbit=require('../models/habbit-home')
const TrackHabbit=require('../models/trackHabbit');

//homepage
module.exports.home=async function(req,res)
{
    try
    {
        let habbits=await Habbit.find({});
        return res.render('home',{
            title:"Habbit Tracker",
            habbit_list:habbits
        });
    }
    catch(err)
    {
        console.log(err);
    } 
}

//add new habit
module.exports.create=async function(req,res)
{
    try
    {
            let newHabbit=await Habbit.create(req.body);
            return res.redirect('back');
    }
    catch(err)
    {
        console.log(err);
    }
    
}

//delete habit
module.exports.delete=async function(req,res)
{
    try
    {
        await Habbit.findByIdAndDelete(req.query.id);
        await TrackHabbit.deleteMany({habbit:req.query.id});
        return res.redirect('back');
    }
    catch(err)
    {
        console.log(err);
    }
    
}

//show habit weekly status
module.exports.track=async function(req,res)
{
    try
    {
        let habbit=await Habbit.findById(req.query.id);
        let details=await TrackHabbit.find({});
        return res.render('trackHabbit',
        {
            title:"Habbit Tracker",
            trackHabbit:habbit,
            details:details
        });
    }
    catch(err)
    {
        console.log(err);
    }
    
}

//update weekly habit status
module.exports.update=async function(req,res)
{
    try
    {
        var habbitId=req.query.id;
        let habbit=await Habbit.findById(habbitId);
        if(!habbit.track)
        {
            let track=await TrackHabbit.create({
                habbit:habbit,
                day1:req.body.day1,
                day2:req.body.day2,
                day3:req.body.day3,
                day4:req.body.day4,
                day5:req.body.day5,
                day6:req.body.day6,
                day7:req.body.day7
            });
            habbit.track=track;
            habbit.save();
            return res.redirect('back');
        }
        else
        {
            let track=await TrackHabbit.findById(habbit.track);
            if(req.body.day1!=undefined)         
                track.day1=req.body.day1;          
            if(req.body.day2!=undefined)          
                track.day2=req.body.day2;         
            if(req.body.day3!=undefined)          
                track.day3=req.body.day3;           
            if(req.body.day4!=undefined)        
                track.day4=req.body.day4;         
            if(req.body.day5!=undefined)           
                track.day5=req.body.day5;           
            if(req.body.day6!=undefined)      
                track.day6=req.body.day6;       
            if(req.body.day7!=undefined)         
                track.day7=req.body.day7;
            track.save();
            return res.redirect('back');
        }  
    }
    catch(err)
    {
        console.log(err);
    }   
}