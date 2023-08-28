const express = require('express');
const app = express();
const rout = express.Router();
const truecallerjs = require('truecallerjs');
const path = require('path');
const hbs = require('hbs');
const os = require('os');
// about ox bit of system


const port = process.env.PORT || 8200;

//aquaring static files like css, image ,js  etc.. 
const staticPath = path.join(__dirname, '../public');
const partialsPath = path.join(__dirname, '../views/partials');
hbs.registerPartials(partialsPath);
app.use(express.static(staticPath));

// here written two line of code is must necessery to get form value from form tag********
// setting that all data in json coming
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// setting up views file for default  view
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../views'));

// now  send  response as per request 
app.get('/', (req, res) => {
    res.render('index')
});

app.get('/search', (req, res) => {
    res.render('search', {
        title: " Search Phone Number ONLY IND.",
    });
});

// handling form now
app.post('/search', (req, res) => {
    var ph = req.body.phone;
    if (ph.length !== 10 || ph == "") {
        res.render("search", {
            errmsg: "Phone Number Must be only 10 digit and that is related to only india.",
            title: "Search Phone Number"
        })
    } else {
        // trucaller installation id
        const truecallerid = "a1i0p--gDptrCFNFyknnaAzXPMUxTxEuNAE4XxXqco1B8r9pmWhgZjXCD6r3u391";
        var searchData = {
            number: ph,
            countryCode: "IN",
            installationId: truecallerid,
            output: "JSON"
        }

        var sn = truecallerjs.searchNumber(searchData);
        sn.then(function (response) {
            var rs = JSON.parse(response);
            console.log(rs)
            if (rs.data == 'null') {
                res.render("search", {
                    errorResp: rs.errorResp,
                    responseStatus: rs.responseStatus,
                })
            } else {

                // Check if rs.data is an array with at least one element
                if (Array.isArray(rs.data) && rs.data.length > 0) {
                    var data = rs.data[0]; // The first element in the array

                    res.render("search", {
                        phone: ph,
                        title: "Search About Phone Number IND",
                        access: data.access,
                        name: data.name,

                        // Check if addresses is an array with at least one element
                        city: (Array.isArray(data.addresses) && data.addresses.length > 0) ? data.addresses[0].city : undefined,

                        imgSrc: data.image,
                        id: data.id,
                        osType: os.type(),
                        osUser: os.userInfo().username,

                        // Check if phones is an array with at least one element
                        numberType: (Array.isArray(data.phones) && data.phones.length > 0) ? data.phones[0].numberType : undefined,

                        // Check if addresses is an array with at least one element
                        timeZone: (Array.isArray(data.addresses) && data.addresses.length > 0) ? data.addresses[0].timeZone : undefined,

                        // Check if phones is an array with at least one element
                        carrier: (Array.isArray(data.phones) && data.phones.length > 0) ? data.phones[0].carrier : undefined
                    });
                } else {
                    // Handle the case where rs.data is empty
                    res.render("search", {
                        phone: ph,
                        title: "Search About Phone Number IND",
                        access: undefined,
                        name: undefined,
                        city: undefined,
                        imgSrc: undefined,
                        id: undefined,
                        osType: os.type(),
                        osUser: os.userInfo().username,
                        numberType: undefined,
                        timeZone: undefined,
                        carrier: undefined
                    });
                }
            }
        });

    }


});

// console.log(staticPath)
// console.log(os.arch());
app.listen(port, () => {
    console.log(`listing at port ${port}`);
})
