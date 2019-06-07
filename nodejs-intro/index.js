var express = require('express');
var app = express();
var fs = require("fs");
var bodyParser = require('body-parser');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/" + "index.htm");
})

var clientes = {}


app.post('/addCliente/:name', urlencodedParser, function (req, res) {       
    if (clientes[req.params.name] === undefined) {
        clientes[req.params.name] = req.body.cpf;
        res.end("Success");
    } else {
        res.end("Cliente " + req.params.name + " already exists");
    }
})

app.post('/editCliente/:name', urlencodedParser, function (req, res) {   
    console.log(req.params.name, clientes[req.body.name], clientes);
    if (clientes[req.params.name] === undefined) {        
        res.end("Cliente " + req.params.name + " not exists");
    } else {
        clientes[req.params.name] = req.body.cpf;
        res.end("Success");
    }
});

app.get('/getCliente/:name', urlencodedParser, function (req, res) {
    if (clientes[req.params.name] === undefined) {        
        res.end("Cliente " + req.body.name + " not exists");
    } else {       
        res.end(JSON.stringify({name:req.params.name,cpf:clientes[req.params.name]}));
    }
});

app.get('/getClientes', urlencodedParser, function (req, res) {
    res.end(JSON.stringify(clientes));
    
});

app.post('/deleteCliente/:name', urlencodedParser, function (req, res) {
    if (clientes[req.params.name] === undefined) {        
        res.end("Cliente " + req.params.name + " not exists");
    } else {
        delete clientes[req.params.name];
        res.end("Success");
    }
});

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})