var root = this;
var finance = require('./finance');

root.setup = function ( app ) {
    app.namespace('/api', function () {
        app.namespace('/finance', function () {
            app.namespace('/earning', function () {
                app.post('/', finance.earning.create);    
                app.put('/:id', finance.earning.update);
                app.get('/:id', finance.earning.read);
                app.del('/:id', finance.earning.del);
            });
        }); 
    });    
};
