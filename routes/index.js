var root = this;
var finance = require('./finance');

root.setup = function ( app ) {
    app.namespace('/api', function () {
        app.namespace('/finance', function () {
            app.post('/earning', finance.earning);
        }); 
    });    
};
