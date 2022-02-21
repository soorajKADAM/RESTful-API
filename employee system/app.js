const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");


app.use(bodyParser.json());


const conn = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "employee",
});


conn.connect((err) => {
	if (err) throw err;
	console.log("MySQL connected");
});



app.post("/api/add", (req, res) => {
	let data = {  name: req.body.name,  dept:req.body.dept ,salary: req.body.salary };
	let sql = "INSERT INTO emp SET ?";
	let query = conn.query(sql, data, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({response: "New Record is Added successfully" }));
	});
});



app.get("/api/view", (req, res) => {
	let sql = "SELECT * FROM emp";
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({  response: result }));
	});
});


app.get("/api/view/:id", (req, res) => {
	let sql = "SELECT * FROM emp WHERE id=" + req.params.id;
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({ response: result }));
	});
});


app.put("/api/update/", (req, res) => {
	let sql = "UPDATE emp SET id='" + req.body.id +"',name='" + req.body.name + "', dept='" + req.body.dept + "',salary='" + req.body.salary +"' WHERE id=" + req.body.id;
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({  response: "Record updated SuccessFully" }));
	});
});


app.delete("/api/delete/:id", (req, res) => {
	let sql = "DELETE FROM emp WHERE id=" + req.params.id + "";
	let query = conn.query(sql, (err, result) => {
		if (err) throw err;
		res.send(JSON.stringify({  response: "Record deleted successfully" }));
	});
});



app.listen(8000, () => {
	console.log("server started on port 8000...");
});
