var root = this;
var mongoose = require('mongoose');
var earning = require('../models/earning');

root.earning = function ( req, res ) {
    var code = 500;
    var out = { id: null, message: [], status: false };
    var pivot = req.body;
    var Earning = earning.Model;

    function successHandler ( result ) {
        code = 200;
        if ( result ) out.id = result['_id'];
        out.message.push('Earning was added!');
        out.status = true;
        res.send( code, out );
    }

    function failHandler ( err ) {
        out.message.push('Earning was not added!');
        if ( err && 'errors' in err ) 
            out.message.push( err['errors'] );
        res.send( code, out );
    }

    function earningHandler ( err, result ) {
        if ( !err && result ) {
            successHandler( result );
        } else {
            failHandler( err );    
        }
    }

    Earning( pivot ).save( earningHandler );
};
