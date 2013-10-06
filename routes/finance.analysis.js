var root = this;
var earnings = require('../models/earnings');
var spending = require('../models/spending');

root.analysis = {};

root.analysis.spendingOverall = function ( req, res ) {
    var code = 500;
    var out = { result: {}, message: [], status: false };
    var pivot = req.body;
    var query = {};
    var Earnings = earnings.Model;
    var Spending = spending.Model;
    var earningsTotal = 0; 
    var spendingsTotal = 0;

    function successHandler ( result ) {
        code = 200;
        out.result.totalSpending = result;
        out.message.push('overall was rendered!');
        out.status = true;
        res.send( code, out );
    }

    function failHandler ( err ) {
        out.message.push('overall was not rendered!');
        if ( err && 'errors' in err ) 
            out.message.push( err['errors'] );
        res.send( code, out );
    }

    function spendingHandler ( err, result ) {
        if ( !err && result ) {
            result.map(function (item) {
                spendingsTotal += item.value; 
            });
            successHandler( ( earningsTotal - spendingsTotal ) );
        } else {
            failHandler( err );    
        }
    }

    function earningsHandler ( err, result ) {
        if ( !err && result ) {
            result.map(function ( item ) {
                earningsTotal += item.value;
            });
            Spending.find( query, spendingHandler );
        } else {
            failHandler( err );    
        }
    }

    Earnings.find( query, earningsHandler );
};

module.exports = root.analysis;
