const mongoose = require("mongoose");
const config = require('../config');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = 'http://localhost:3030';
const should = chai.should();
const URL = require('../models/url.model');
chai.use(chaiHttp);

mongoose.connect(`${config.DATABASE.HOST}${config.DATABASE.NAME}`);
mongoose.Promise = global.Promise;

describe('URL', () => {
	let urlId;

	before((done) => {
		URL.remove({}, (err) => {
			if (err) {
				throw err;
			}
			done();
		});
	});

	it('it should GET all the URLS', (done) => {
		chai.request(server)
			.get('/api/url')
			.end((err, res) => {
				res.should.have.status(200);
				res.body.urls.should.be.a('array');
				res.body.urls.length.should.be.eql(0);
				done();
			});
	});

	it('it should not POST a URL without url field', (done) => {
		chai.request(server)
			.post('/api/url')
			.end((err, res) => {
				res.should.have.status(400);
				res.body.message.should.be.eql('No url provided');
				res.body.status.should.be.eql(false);
				done();
			});
	});

	it('it should not POST a URL without valid url field', (done) => {
		let data = {
			url : 'helloworld'
		};
		chai.request(server)
			.post('/api/url')
			.send(data)
			.end((err, res) => {
				res.should.have.status(400);
				res.body.message.should.be.eql('Please provide a valid URL');
				res.body.status.should.be.eql(false);
				done();
			});
	});

	it('it should POST with a valid URL without http or https', (done) => {
		let data = {
			url: 'helloworld.com'
		};
		chai.request(server)
			.post('/api/url')
			.send(data)
			.end((err, res) => {
				let arraySplited = res.body.shortenUrl.split('/');
				urlId = arraySplited[arraySplited.length - 1];
				res.should.have.status(200);
				res.body.message.should.be.eql('Shorten Correctly');
				res.body.status.should.be.eql(true);
				res.body.shortenUrl.should.to.be.a('string');
				done();
			});
	});

	it('it should not POST the same long URL', (done) => {
		let data = {
			url: 'helloworld.com'
		};
		chai.request(server)
			.post('/api/url')
			.send(data)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.status.should.be.eql(false);
				res.body.message.should.be.eql('Duplicated URL');
				res.body.shortenUrl.should.to.be.a('string');
				done();
			});
	});

	it('it should not GET and specific URL with invalid Id', (done) => {
		chai.request(server)
			.get('/api/url/sasd')
			.end((err, res) => {
				res.should.have.status(200);
				res.body.status.should.be.eql(false);
				res.body.message.should.be.eql('URL not found!');
				done();
			});
	});

	it('it should GET and specific URL with valid Id and with http prefix', (done) => {
		chai.request(server)
			.get(`/api/url/${urlId}`)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.status.should.be.eql(true);
				res.body.message.should.be.eql('Enjoy you URL');
				res.body.url.should.be.eql('http://helloworld.com');
				done();
			});
	});

	it('it should POST with a valid URL with http or https', (done) => {
		let data = {
			url: 'http://whatsapp.com'
		};
		chai.request(server)
			.post('/api/url')
			.send(data)
			.end((err, res) => {
				let arraySplited = res.body.shortenUrl.split('/');
				urlId = arraySplited[arraySplited.length - 1];
				res.should.have.status(200);
				res.body.message.should.be.eql('Shorten Correctly');
				res.body.status.should.be.eql(true);
				res.body.shortenUrl.should.to.be.a('string');
				done();
			});
	});

	it('it should GET and specific URL with valid Id', (done) => {
		chai.request(server)
			.get(`/api/url/${urlId}`)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.status.should.be.eql(true);
				res.body.message.should.be.eql('Enjoy you URL');
				res.body.url.should.be.eql('http://whatsapp.com');
				done();
			});
	});
});
