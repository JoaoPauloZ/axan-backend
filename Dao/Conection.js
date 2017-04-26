var sys = require("sys");
var pg = require("postgres-pure");

var db = new pg.connect("pgsql://postgres:12345@localhost:5432/axan");
db.query("SELECT * FROM usuario", function (data) {
    console.log(data);
});
db.close();