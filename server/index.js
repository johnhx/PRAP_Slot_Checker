var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

var app     = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());

app.get("/", function(req, res) {
    res.send("hello world");
})

app.post('/recent', function(req, res){
    var data = req.body;

    var url = "https://eappointment.ica.gov.sg/ibook/publicLogin.do";
    
    var formData = {
        "apptDetails.apptType" : "PRAP",
        "apptDetails.identifier1" : data.fin,
        "apptDetails.identifier2" : "1",
        "apptDetails.identifier3" : data.phone
    }

    request.post(url, {form: formData}, function(err, resp, html) {
        if(err) {
            console.log(err);
            return;
        }

        var $ = cheerio.load(html);

        var phs = $(".cal_AS").get().length;
        res.json({date: phs});
    });
})

app.post("/latest", function(req, res) {
    var data = req.body;
    var url = "https://eappointment.ica.gov.sg/ibook/publicLogin.do?nav=N";
    var formData = {
        "apptDetails.apptType" : "PRAP",
        "apptDetails.identifier1" : data.fin,
        "apptDetails.identifier2" : "1",
        "apptDetails.identifier3" : data.phone,
        "calendar.nextCalDate" : getNext2Month().toLocaleDateString("en-GB")
    }

    request.post(url, {form: formData}, function(err, resp, html) {
        if(err) {
            console.log(err);
            return;
        }

        var $ = cheerio.load(html);

        var phs = $(".cal_AS").get().length;
        res.json({date: phs});
    });
})


function getNext2Month() {
    var now = new Date();
    if (now.getMonth() == 10) {
        return new Date(now.getFullYear() + 1, 0, 1);
    }
    return new Date(now.getFullYear(), now.getMonth() + 2, 1);
}

app.listen('9100', function() {
    console.log("hit port 9100 to go!");
});