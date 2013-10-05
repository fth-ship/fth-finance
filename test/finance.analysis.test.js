var app = require('../app');
var superagent = require('superagent');
var should = require('should');
var url = require('url');
var ch = require('charlatan');

app.listen( 3000 );

describe('Finance', function () {
    var target = 'http://localhost:3000';
    var agent = superagent.agent(); 
    var earnings = {
        title: ch.Name.title(),
        value: ch.numerify('####') 
    };
    var spending = {
        title: ch.Name.title(),
        value: ch.numerify('####') 
    };
    var totalSpending = ( earnings.value - spending.value );

    describe('analysis', function () {
        it('earnings', function ( done ) {
            function requestHandler ( e, res ) {
                should.not.exist( e );
                res.status.should.be.eql( 200 );
                res.body.id.should.have.lengthOf( 24 );
                res.body.message.should.include('earnings was added!');
                res.body.status.should.be.ok;

                done(); 
            }

            agent
                .post( url.resolve( target, '/api/finance/earnings' ) )
                .send( earnings )
                .end( requestHandler );
        });

        it('spending', function ( done ) {
            function requestHandler ( e, res ) {
                should.not.exist( e );
                res.status.should.be.eql( 200 );
                res.body.id.should.have.lengthOf( 24 );
                res.body.message.should.include('spending was added!');
                res.body.status.should.be.ok;

                done(); 
            }

            agent
                .post( url.resolve( target, '/api/finance/spending' ) )
                .send( spending )
                .end( requestHandler );
        });

        it('speding overall', function ( done ) {
            function requestHandler ( e, res ) {
                should.not.exist( e );
                res.status.should.be.eql( 200 );
                should.exist( res.body.result );
                res.body.result.totalSpending.should.eql( totalSpending );
                res.body.message.should.include('overall was rendered!');
                res.body.status.should.be.ok;

                done(); 
            }

            agent
                .get( 
                    url.resolve( 
                        target, 
                        ( '/api/finance/analysis/spending/overall' )
                    ) 
                )
                .send( spending )
                .end( requestHandler );
        });
    });
});
