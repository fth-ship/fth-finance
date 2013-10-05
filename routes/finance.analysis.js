var root = this;
var earnings = require('../models/spending');
var spending = require('../models/spending');

root.analysis = {};

root.analysis.spendingOverall = function ( req, res ) {
    var code = 500;
    var out = { result: {}, message: [], status: false };
    var pivot = req.body;
    var query = {};
    var Earnings = earnings.Model;
    var Spending = spending.Model;
    var totalSpending = out.result.totalSpending = 0; 

    function successHandler ( result ) {
        code = 200;
        if ( result ) out.id = result['_id'];
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
            var spendingsResult = 0;
            result.map(function (item) {
                spendingsResult += item.value; 
            });
            successHandler();
        } else {
            failHandler( err );    
        }
    }

    function earningsHandler ( err, result ) {
        if ( !err && result ) {
            result.map(function ( item ) {
                totalSpending += item.value;
            });
            Spending.find( query, spendingHandler );
        } else {
            failHandler( err );    
        }
    }

    Earnings.find( query, earningsHandler );
};

module.exports = root.analysis;
