const express = require('express');
const app = express();
const rout  =express.Router();
const truecallerjs = require('truecallerjs');
const path = require('path');
const hbs = require('hbs');
const os = require('os');
// about ox bit of system


const port =80;

//aquaring static files like css, image ,js  etc.. 
const staticPath = path.join(__dirname,'../public');
const partialsPath = path.join(__dirname,'../views/partials');
hbs.registerPartials(partialsPath);
app.use(express.static(staticPath));

// here written two line of code is must necessery to get form value from form tag********
// setting that all data in json coming
app.use(express.json());
app.use(express.urlencoded({extended:false}));


// setting up views file for default  view
app.set('view engine','hbs');

// now  send  response as per request 
app.get('/',(req,res)=>{
    res.render('index')
});

app.get('/search',(req,res)=>{
    res.render('search');
});

// handling form now
app.post('/search',(req,res)=>{
   var ph = req.body.phone;
   if(ph.length > 10){
    res.render("search",{
        errmsg:"Phone Number Must be only 10 digit and that is related to only india.",
        title:"Search Phone Number"
    })
   }else{
        // trucaller installation id
        const truecallerid = "a1i0w--ZTYM4L-tFnbsTaA065jXEnV6ZSmPVzFN3sheJIPe_k2qK97nTP6N2jt1a";
        var searchData = {
            number: ph,
            countryCode: "IN",
            installationId: truecallerid,
            output:"JSON"
        }

        var sn = truecallerjs.searchNumber(searchData);
        sn.then(function(response) {
        
            var rs= JSON.parse(response);
            // res.send(rs.data[0].name)
            res.render("search",{
                phone:ph,
                access:rs.data[0].access, 
                name:rs.data[0].name,
                city:rs.data[0].city,
                image:rs.data[0].image,
                id:rs.data[0].id,
                numberType:rs.data[0].numberType,
                timeZone:rs.data[0].timeZone ,
                carrier:rs.data[0].carrier
            })
        });
    
   }
   
 
});

console.log(staticPath)
// console.log(os.arch());
app.listen(port,()=>{
    console.log(`listing at port ${port}`);
})