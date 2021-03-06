'use strict';
var server_port =  process.env.PORT || 5000;
let express = require('express');
let bodyParser = require('body-parser');
let app = express().use(bodyParser.json());

app.listen(server_port, ()=>{
	console.log('Server is running on ' + server_port	);
})

app.post('/chatbot', (req,res)=>{
	var body = req.body;

	if(body.object == 'page'){
		body.entry.forEach((entry)=>{
			console.log(entry);
		});

		res.status(200).send('EVENT_RECEIVED');
	} else{
		res.sendStatus(404);
	}

});

app.get('/chatbot',(req,res)=>{
	let VERIFY_TOKEN = "khanhdeptrai";

	let mode = req.query['hub.mode'];
	let token = req.query['hub.verify_token'];
	let challenge = req.query['hub.challenge'];

	if(mode&& token){
		if(mode == 'subscribe' && token == VERIFY_TOKEN){
			console.log('Chatbot is verified.');
			res.status(200).send(challenge);
		} else{
			res.sendStatus(403);
		}
	} else{
		res.sendStatus(404);
	}
});