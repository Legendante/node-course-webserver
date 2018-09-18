const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const heroport = process.env.PORT || 3000;  
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
	var now = new Date().toString();
	var retStr = `${now}: ${req.method} ${req.url}`;
	console.log(retStr);
	fs.appendFile('server.log', retStr + '\n', (err) => {
		if(err)
		{
			console.log("Could not write to server.log");
		}
	});
	next();
});

// app.use((req, res, next) => {
	// res.render('maintenance.hbs', 
	// {
		// pageTitle: "Maintenance page",
		// welcomeMessage: "Welcome to Node JS server thingy"
	// });
// });
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/', (req, res) => {
	res.render('home.hbs', 
	{
		pageTitle: "Home page",
		welcomeMessage: "Welcome to Node JS server thingy"
	});
});

app.get('/about', (req, res) => {
	// res.send('<h1>About Page</h1>');
	res.render('about.hbs', 
	{
		pageTitle: "About page"
	});
});

app.get('/bad', (req, res) => {
	res.send(
	{
	err: '<h1>Bad Browser!</h1>',
	code: 'Cause I said so'
	});
});

app.get('/projects', (req, res) => {
	// res.send('<h1>About Page</h1>');
	res.render('projects.hbs', 
	{
		pageTitle: "Projects page"
	});
});


app.listen(heroport, () => 
{
	console.log(`Server is up on port ${heroport}`);
});