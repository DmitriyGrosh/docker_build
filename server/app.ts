const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const Item = require("./models/item");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

mongoose.connect('mongodb://mongo:27017/docker-node-mongo')
	.then(() => console.log('==========>mongoDB connected'))
	.catch((e: any) => console.log('==========>e', e));

// @ts-ignore
app.get('/', (request, response) => {
	console.log('==========>1', 1);
	response.send('Hello World!')
});

// @ts-ignore
app.post('/items/add', (request, response) => {
	const newItem = new Item({
		name: request.body
	});

	newItem.save().then(() => response.sendStatus(200));
});


const port = 5000;
app.listen(port, () => console.log(`Running on port ${port}`));
