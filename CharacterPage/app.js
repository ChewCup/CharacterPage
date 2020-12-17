var http = require('http');
var fs = require("fs");
var url = require("url");
function mainPage(res) {
    fs.readFile("mainpage.html", function (err, html) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        //res.write("#print { position: absolute; right: 250; top: 100;");
        res.write("<table>")
        let data = fs.readFileSync('charslist.lis');
        let lines = data.toString().split(/\r?\n/);
        for (l of lines) {
            //res.write("<tr>\n");
            let wordlist = l.split(',');
            for (words of wordlist) {
                res.write("<td>" + words + "</td>");
            }
            res.write("<tr>");
        }
        res.write("</table>");
        res.write(html);
        return res.end();
    });
}
function appendpage(res, query) {
    fs.readFile("appendpage.html", function (err, html, query) {
        res.write(html);
        return res.end();
    });
        res.write("<table>");
        var name = query.name;
        var nameclass = query.nameclass;
        res.write("<p>Created " + name + " as " + nameclass + " \class\ </p>");
        fs.appendFileSync('charslist.lis', name + " " + nameclass + "\n");
        let data = fs.readFileSync('charslist.lis');
        let lines = data.toString().split(/\r?\n/);
        for (l of lines) {
            res.write("<p>" + l + "</p>");
        }
        res.write("</table>");
}
http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    var q = url.parse(req.url, true);
    var urlpath = q.pathname;
    if (urlpath == "/") {
        mainPage(res);
    }
    if (urlpath == "/append") {
        appendpage(res, q.query);
    }
    console.log("Serving " + req.url);
}).listen(8080);