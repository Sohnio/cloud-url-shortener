process.env.NODE_ENV = 'test';

const mongoose = require("mongoose");
const ShortUrl = require('../models/shortUrl');

const assert = require('assert');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../server');
const urlTools = require('../urlTools');


// Configure chai
chai.use(chaiHttp);
chai.should();

describe('Predefined tests', () => {
    it('URL Validation', () => {
            assert.strictEqual(urlTools.isValidURL('https://docs.docker.'), false);
            assert.strictEqual(urlTools.isValidURL('https://docs.docker.'), false);
            assert.strictEqual(urlTools.isValidURL('https://docs.docker.com/docker-for-windows/'), true);
            assert.strictEqual(urlTools.isValidURL('https://docs.docker.com/docker-for-windows/'), true);
            assert.strictEqual(urlTools.isValidURL('https://docs.docker.com/docker-for-windows/'), true);
            assert.strictEqual(urlTools.isValidURL('https://docs.docker.com/docker-for-windows/'), true);
       });
    it('URL should be shorter than 6', () => {
           assert.strictEqual(urlTools.getShortenUrl().length < 6, true);
       });
    it('Check generated URLs for duplicates', () => {
        let generatedURLs = []
        for (var i = 1; i <= 1000; i++) {
            generatedURLs.push(urlTools.getShortenUrl());
         }
        assert.strictEqual(generatedURLs.length, 1000);
        assert.strictEqual((new Set(generatedURLs)).size, 1000);
    });
   });

describe('ShortUrl', () => {
    beforeEach((done) => {
        ShortUrl.remove({}, (err) => {
            done();
         });
    });

  describe('Application tests', () => {
      it('Application reachable', (done) => {
        chai.request(app)
            .get('/')
            .end((err, res) => {
                  res.should.have.status(200);
              done();
            });
      });
  });

});