const express = require('express');
const path = require('path');

const app = express(); 

app.use(express.static('public'))

app.get('/', (req, res, next) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(9000, () => {
	console.log('Server running on port 9000');
});