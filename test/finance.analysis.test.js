var app = require('../app');
var superagent = require('superagent');
var should = require('should');
var url = require('url');
var ch = require('charlatan');
var exec = require('child_process').exec;

app.listen( 3000 );

describe('Finance', function () {
    var target = 'http://localhost:3000';
    var agent = superagent.agent(); 
    var earnings = null; 
    var spendings = null; 
    var totalSpending = null;

    describe('analysis', function () {
        it('earnings', function ( done ) {
            earnings = {
                title: ch.Name.title(),
                value: ch.numerify('####') 
            };

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
            spendings = {
                title: ch.Name.title(),
                value: ch.numerify('####') 
            };

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
                .send( spendings )
                .end( requestHandler );
        });

        it('speding overall', function ( done ) {
            totalSpending = ( earnings.value - spendings.value );

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
                .end( requestHandler );
        });
    });

    after(function (done) {
        var command = [
            'mongo', 'finance_development',
            '--eval', '"db.dropDatabase();"'
        ].join(' ');
        var mongoDropDatabase = null;

        function execHandler ( err, stdout, stderr ) {
            if ( err ) throw err;
            if ( stdout ) console.log( stdout );
            if ( stderr ) console.log( stderr );
            done();
        }

        mongoDropDatabase = exec( command, execHandler );
    });
});
