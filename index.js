const express = require("express");
const { request } = require("express");

const app = express();

function makeResponse(request, data, endSession) {
	const { session, version } = request;
	return {
		session,
		version,
		response: {
			text: data.toString(),
			end_session: !!endSession
		}
	};
}

function needHelp(request) {
	const helpWords = ['еще', 'снова', 'заново', 'повтори', 'помощь'];
	return !request.nlu.tokens || !!request.nlu.tokens.length
		&& request.nlu.tokens.some((token) => {
			return helpWords.indexOf(token) !== -1;
		});
}

function heedStop(request) {
	const stopWords = ['хватит', 'спасибо', 'пока', 'хватит'];
	return request.nlu.tokens && !request.nlu.tokens.length
		&& request.nlu.tokens.some((token) => {
			return stopWords.indexOf(token) !== -1;
		});
}

app.use(express.json());

app.get('/', (req, res) => {
	console.log('Index loading');
	res.status(200).send('Ok');
});

app.post('/', (req,res) => {
	var response = ''
		endSession = false;

	if (needHelp(req.body.request)) {
		response = 'Я помгу вам узнать ай пи адрес станции';
	} else if (heedStop(req.body.request)) {
		response = 'Пока';
		endSession = true;
	} else {
		response = req.ip;
	}

	console.log('req', JSON.stringify(req.body), req.ip, req.ips, req.headers);
	res.status(200).json(makeResponse(req.body, response, endSession));
});

app.listen(process.env.PORT || 8000, (args) => {
	console.log(`App started at ${args}`)
});