var express=require("express");

var app=express();

const path=require('path');

var port=8000;

app.set('view engine','ejs');

app.set('views',path.join(__dirname,'views'));

app.use(express.static('assets'));

app.use(express.urlencoded({extended:true}));

const db=require('./config/mongoose');

app.use('/', require('./routes'));

app.listen(port,function(err)
{
    if(err)
    {
        console.log("Error");
        return;
    }
    console.log("Setted up Server correctly at post:",port);
})

