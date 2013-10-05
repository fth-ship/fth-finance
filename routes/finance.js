var root = this;
var mongoose = require('mongoose');
var earning = require('../models/earning');

root.earning = {};

root.earning.create = function ( req, res ) {
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

root.earning.update = function ( req, res ) {
    var code = 500;
    var out = { message: [], status: false };
    var pivot = req.body;
    var query = { _id: req.params.id };
    var Earning = earning.Model;

    function successHandler ( result ) {
        code = 200;
        out.message.push('Earning was updated!');
        out.status = true;
        res.send( code, out );
    }

    function failHandler ( err ) {
        out.message.push('Earning was not updated!');
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

    Earning.update( query, pivot, 
                    earningHandler );
};

root.earning.read = function ( req, res ) {
    var code = 500;
    var out = { result: {}, message: [], status: false };
    var pivot = req.body;
    var query = { _id: req.params.id };
    var Earning = earning.Model;

    function successHandler ( result ) {
        code = 200;
        out.result = result;
        out.message.push('Earning was readed!');
        out.status = true;
        res.send( code, out );
    }

    function failHandler ( err ) {
        out.message.push('Earning was not readed!');
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

    Earning.findOne( query, 
                     earningHandler );
};

root.earning.del = function ( req, res ) {
    var code = 500;
    var out = { message: [], status: false };
    var pivot = req.body;
    var query = { _id: req.params.id };
    var Earning = earning.Model;

    function successHandler ( result ) {
        code = 200;
        out.message.push('Earning was removed!');
        out.status = true;
        res.send( code, out );
    }

    function failHandler ( err ) {
        out.message.push('Earning was not removed!');
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

    Earning.remove( query, 
                     earningHandler );
};
