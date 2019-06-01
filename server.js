const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

// Setting up node for partial files / Code
hbs.registerPartials(__dirname + '/views/partials');

// Setting up the view engine
app.set('view engine', 'hbs');

// Server setup to serve the folder
app.use(express.static(__dirname + '/public'));

// Maintenance Page
// app.use((req, res, next) => {
// 	res.render('maintenance.hbs');
// })

// Register a middleware
app.use((req, res, next) => {
	var now = new Date().toString();
	var log = `${now}: ${req.method} ? ${req.url}`;
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log("Unable to append to server.log");
		}
	});
	next();
});

// HBS helpers to reuse attributes on template
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
})

// Capitalize helper HBS
hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
})

app.get('/', (req, res) => {
	res.render('home.hbs', {
		title: 'Home',
		heading: 'Home'
	});
})

app.get('/project', (req, res) => {
	res.render('project.hbs', {
		title: 'Project',
		heading: 'Project'
	});
})

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		title: 'About',
		heading: 'About'
	});
})

app.listen(port, () => {
	console.log(
		`Server is up and will serve you on ${port}`
	);
});
