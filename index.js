import express from "express";

const app = express();

app.use('/', express.json, (req,res) => {
	console.log('req', req);
	res.status(200).json(req.ips);
})

app.listen((args) => {
	console.log(`App started at ${args}`)
})