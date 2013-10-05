var app = require('../app');
var superagent = require('superagent');
var should = require('should');
var url = require('url');
var ch = require('charlatan');

app.listen( 3000 );

describe('Finance', function () {
    var target = 'http://localhost:3000';
    var agent = superagent.agent();
    var spending = {
        title: ch.Name.title(),
        value: ch.numerify('####') 
    };
    var spendingID = null;

    describe('spendings', function () {
        it('post', function ( done ) {
            function requestHandler ( e, res ) {
                should.not.exist( e );
                res.status.should.be.eql( 200 );
                res.body.id.should.have.lengthOf( 24 );
                res.body.message.should.include('spending was added!');
                res.body.status.should.be.ok;

                spendingID = res.body.id;
                done(); 
            }

            agent
                .post( url.resolve( target, '/api/finance/spending' ) )
                .send( spending )
                .end( requestHandler );
        });    

        it('put', function ( done ) {
            spending = {
                title: ch.Name.title(),
                value: ch.numerify('####') 
            };

            function requestHandler ( e, res ) {
                should.not.exist( e );
                res.status.should.be.eql( 200 );
                res.body.message.should.include('spending was updated!');
                res.body.status.should.be.ok;

                done(); 
            }

            agent
                .put( 
                    url.resolve( 
                        target, 
                        ( '/api/finance/spending/' + 
                          spendingID )
                    ) 
                )
                .send( spending )
                .end( requestHandler );
        });

        it('get', function ( done ) {
            function requestHandler ( e, res ) {
                should.not.exist( e );
                res.status.should.be.eql( 200 );
                should.exist( res.body.result );
                res.body.message.should.include('spending was readed!');
                res.body.status.should.be.ok;

                done(); 
            }

            agent
                .get( 
                    url.resolve( 
                        target, 
                        ( '/api/finance/spending/' + 
                          spendingID )
                    ) 
                )
                .send( spending )
                .end( requestHandler );
        });

        it('delete', function ( done ) {
            function requestHandler ( e, res ) {
                should.not.exist( e );
                res.status.should.be.eql( 200 );
                res.body.message.should.include('spending was removed!');
                res.body.status.should.be.ok;

                done(); 
            }

            agent
                .del( 
                    url.resolve( 
                        target, 
                        ( '/api/finance/spending/' + 
                          spendingID )
                    ) 
                )
                .send( spending )
                .end( requestHandler );
        });
    });
});
