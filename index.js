const express = require("express");

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
	console.log('Index loading');
	res.status(200).send('Ok');
});

app.post('/', (req,res) => {
	console.log('req', JSON.stringify(req.body), req.ips);
	res.status(200).json(req.ips);
});

app.listen(process.env.PORT || 8000, (args) => {
	console.log(`App started at ${args}`)
});