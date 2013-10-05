var root = this;
var spending = require('../models/spending');

root.spending = {};

root.spending.create = function ( req, res ) {
    var code = 500;
    var out = { id: null, message: [], status: false };
    var pivot = req.body;
    var Spending = spending.Model;

    function successHandler ( result ) {
        code = 200;
        if ( result ) out.id = result['_id'];
        out.message.push('spending was added!');
        out.status = true;
        res.send( code, out );
    }

    function failHandler ( err ) {
        out.message.push('spending was not added!');
        if ( err && 'errors' in err ) 
            out.message.push( err['errors'] );
        res.send( code, out );
    }

    function spendingHandler ( err, result ) {
        if ( !err && result ) {
            successHandler( result );
        } else {
            failHandler( err );    
        }
    }

    Spending( pivot ).save( spendingHandler );
};

root.spending.update = function ( req, res ) {
    var code = 500;
    var out = { message: [], status: false };
    var pivot = req.body;
    var query = { _id: req.params.id };
    var Spending = spending.Model;

    function successHandler ( result ) {
        code = 200;
        out.message.push('spending was updated!');
        out.status = true;
        res.send( code, out );
    }

    function failHandler ( err ) {
        out.message.push('spending was not updated!');
        if ( err && 'errors' in err ) 
            out.message.push( err['errors'] );
        res.send( code, out );
    }

    function spendingHandler ( err, result ) {
        if ( !err && result ) {
            successHandler( result );
        } else {
            failHandler( err );    
        }
    }

    Spending.update( query, pivot, 
                    spendingHandler );
};

root.spending.read = function ( req, res ) {
    var code = 500;
    var out = { result: {}, message: [], status: false };
    var pivot = req.body;
    var query = { _id: req.params.id };
    var Spending = spending.Model;

    function successHandler ( result ) {
        code = 200;
        out.result = result;
        out.message.push('spending was readed!');
        out.status = true;
        res.send( code, out );
    }

    function failHandler ( err ) {
        out.message.push('spending was not readed!');
        if ( err && 'errors' in err ) 
            out.message.push( err['errors'] );
        res.send( code, out );
    }

    function spendingHandler ( err, result ) {
        if ( !err && result ) {
            successHandler( result );
        } else {
            failHandler( err );    
        }
    }

    Spending.findOne( query, 
                     spendingHandler );
};

root.spending.del = function ( req, res ) {
    var code = 500;
    var out = { message: [], status: false };
    var pivot = req.body;
    var query = { _id: req.params.id };
    var Spending = spending.Model;

    function successHandler ( result ) {
        code = 200;
        out.message.push('spending was removed!');
        out.status = true;
        res.send( code, out );
    }

    function failHandler ( err ) {
        out.message.push('spending was not removed!');
        if ( err && 'errors' in err ) 
            out.message.push( err['errors'] );
        res.send( code, out );
    }

    function spendingHandler ( err, result ) {
        if ( !err && result ) {
            successHandler( result );
        } else {
            failHandler( err );    
        }
    }

    Spending.remove( query, 
                     spendingHandler );
};

module.exports = root.spending;
