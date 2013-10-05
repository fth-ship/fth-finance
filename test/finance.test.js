var app = require('../app');
var superagent = require('superagent');
var should = require('should');
var url = require('url');

app.listen( 3000 );

describe('Finance', function () {
    var target = 'http://localhost:3000';
    var agent = superagent.agent();
    var earning = {
        title: 'salary',
        value: 2000
    };

    describe('earnings', function () {
        it('post', function ( done ) {
            function requestHandler ( e, res ) {
                should.not.exist( e );
                res.status.should.be.eql( 200 );
                res.body.id.should.have.lengthOf( 24 );
                res.body.message.should.include('Earning was added!');
                res.body.status.should.be.ok;
                done(); 
            }

            agent
                .post( url.resolve( target, '/api/finance/earning' ) )
                .send( earning )
                .end( requestHandler );
        });    
    });
});
