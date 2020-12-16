var http = require('http');
var fs = require("fs");
var url = require("url");
////////////////////////////////////////////

function mainPage(res) {
    fs.readFile("mainpage.html", function (err, html) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(html);
        return res.end();
    });
}

////////////////////////////////////////////
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    var p = url.parse(req.url, true);
    if (req.url == "/") {
        mainPage(res);
    }
    //res.end();




        









}).listen(8080); 