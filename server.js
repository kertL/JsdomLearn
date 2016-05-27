var path = require('path');
var express = require('express');
var https = require('https');
var fs = require('fs');

var app = express();

var staticPath = path.resolve(__dirname, '/public');

app.use(function (req, res, next) {
    console.log("Request: " + req.url);
    next();
});
//app.use('/', express.static(staticPath));
app.use(express.static('public'));
app.post('/upload', function(req, res){
    var total = '';
//    res.send('POST a file.');
    req.on('data', function (data) {
        total+=data;
    });
    req.on('end', function(){
        //console.log(total.toString());
        res.send(total.length.toString());

    })
})
app.listen(3000, function() {
    console.log('listening');
});
var privateKey  = fs.readFileSync('public/sslcert/cert.cer', 'utf8');
var certificate = fs.readFileSync('public/sslcert/cert.cer', 'utf8');

var credentials = {key: privateKey, cert: certificate};
var httpsServer = https.createServer(credentials,app);
httpsServer.listen(3443);

