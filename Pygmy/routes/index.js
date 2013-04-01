/*
 * Route Handlers
 */

var exec = require('child_process').exec,
    child_process = require('child_process'),
    fs = require('fs'),
    child_processes = [];

module.exportts = function(app) {
	app.get("/", getHomePage); //render the index page.
	app.post("/add", postAddScraper); //add a new scraper. 
}

function getHomePage(req,res) {
	res.render('index');
}

function postAddScraper(req,res) {

	var url = req.body.url,
	    auth_user = req.body.auth_user,
	    auth_pass = req.body.auth_pass,
	    depth = parseInt(req.body.create_crawler_depth), //gets the depth from index.ejs
	    create_sitemap = req.body.create_crawler_sitemap == 1,
	    clean = req.body.clean_crawler == 1;

	var child = child_process.fork("crawling-daemon.js");

	if(auth_user!="" && auth_pass!="")
		child.send({
			action:"setAuth",
			auth_user: auth_user,
			auth_pass: auth_pass
		})

	child.send({
		action: "start",
		url: url,
		clean: clean,
		depth: depth
	});

	child.on("message", function(data) {
		switch(data) {
			case "




