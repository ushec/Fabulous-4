// const chai = require('chai');
// const chaiHttp = require('chai-http');
import chai from 'chai';
import chaiHttp from 'chai-http';
const request = require('chai').request;
const app = require('../server/index.js');

const { expect } = chai;

chai.use(chaiHttp);

describe('Students API', () => {
    it('should return student data by ID', (done) => {
        request(app)
            .get('/students/1') // Assuming you have a student with ID 1 in your database
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('id');
                expect(res.body).to.have.property('name');
                expect(res.body).to.have.property('programme');
                expect(res.body).to.have.property('modules');
                done();
            });
    });
});

export default chai;