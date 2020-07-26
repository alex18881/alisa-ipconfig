const express = require("express");

const app = express();

app.get('/', (req, res) => {
	console.log('Index loading');
	res.status(200).send('Ok');
});

app.post('/', express.json, (req,res) => {
	console.log('req', req);
	res.status(200).json(req.ips);
});

app.listen(process.env.PORT || 8000, (args) => {
	console.log(`App started at ${args}`)
});