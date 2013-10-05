var root = this;
var earnings = require('../models/earnings');

root.earnings = {};

root.earnings.create = function ( req, res ) {
    var code = 500;
    var out = { id: null, message: [], status: false };
    var pivot = req.body;
    var Earnings = earnings.Model;

    function successHandler ( result ) {
        code = 200;
        if ( result ) out.id = result['_id'];
        out.message.push('earnings was added!');
        out.status = true;
        res.send( code, out );
    }

    function failHandler ( err ) {
        out.message.push('earnings was not added!');
        if ( err && 'errors' in err ) 
            out.message.push( err['errors'] );
        res.send( code, out );
    }

    function earningsHandler ( err, result ) {
        if ( !err && result ) {
            successHandler( result );
        } else {
            failHandler( err );    
        }
    }

    Earnings( pivot ).save( earningsHandler );
};

root.earnings.update = function ( req, res ) {
    var code = 500;
    var out = { message: [], status: false };
    var pivot = req.body;
    var query = { _id: req.params.id };
    var Earnings = earnings.Model;

    function successHandler ( result ) {
        code = 200;
        out.message.push('earnings was updated!');
        out.status = true;
        res.send( code, out );
    }

    function failHandler ( err ) {
        out.message.push('earnings was not updated!');
        if ( err && 'errors' in err ) 
            out.message.push( err['errors'] );
        res.send( code, out );
    }

    function earningsHandler ( err, result ) {
        if ( !err && result ) {
            successHandler( result );
        } else {
            failHandler( err );    
        }
    }

    Earnings.update( query, pivot, 
                    earningsHandler );
};

root.earnings.read = function ( req, res ) {
    var code = 500;
    var out = { result: {}, message: [], status: false };
    var pivot = req.body;
    var query = { _id: req.params.id };
    var Earnings = earnings.Model;

    function successHandler ( result ) {
        code = 200;
        out.result = result;
        out.message.push('earnings was readed!');
        out.status = true;
        res.send( code, out );
    }

    function failHandler ( err ) {
        out.message.push('earnings was not readed!');
        if ( err && 'errors' in err ) 
            out.message.push( err['errors'] );
        res.send( code, out );
    }

    function earningsHandler ( err, result ) {
        if ( !err && result ) {
            successHandler( result );
        } else {
            failHandler( err );    
        }
    }

    Earnings.findOne( query, 
                     earningsHandler );
};

root.earnings.del = function ( req, res ) {
    var code = 500;
    var out = { message: [], status: false };
    var pivot = req.body;
    var query = { _id: req.params.id };
    var Earnings = earnings.Model;

    function successHandler ( result ) {
        code = 200;
        out.message.push('earnings was removed!');
        out.status = true;
        res.send( code, out );
    }

    function failHandler ( err ) {
        out.message.push('earnings was not removed!');
        if ( err && 'errors' in err ) 
            out.message.push( err['errors'] );
        res.send( code, out );
    }

    function earningsHandler ( err, result ) {
        if ( !err && result ) {
            successHandler( result );
        } else {
            failHandler( err );    
        }
    }

    Earnings.remove( query, 
                     earningsHandler );
};

module.exports = root.earnings;
