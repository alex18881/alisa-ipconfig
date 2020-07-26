const express = require("express");
const { request } = require("express");

const app = express();

function makeResponse(request, data) {
	const { session, version } = request;
	return {
		session,
		version,
		response: {
			text: data.toString(),
			end_session : false
		}
	};
}

app.use(express.json());

app.get('/', (req, res) => {
	console.log('Index loading');
	res.status(200).send('Ok');
});

app.post('/', (req,res) => {
	console.log('req', JSON.stringify(req.body), req.ip, req.ips, req.headers);
	res.status(200).json(makeResponse(req.body, req.ip));
});

app.listen(process.env.PORT || 8000, (args) => {
	console.log(`App started at ${args}`)
});