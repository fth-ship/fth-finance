var root = this;
var finance = require('./finance');

root.setup = function ( app ) {
    app.namespace('/api', function () {
        app.namespace('/finance', function () {
            app.namespace('/earnings', function () {
                app.post('/', finance.earnings.create);    
                app.put('/:id', finance.earnings.update);
                app.get('/:id', finance.earnings.read);
                app.del('/:id', finance.earnings.del);
            });

            app.namespace('/spending', function () {
                app.post('/', finance.spending.create);    
                app.put('/:id', finance.spending.update);
                app.get('/:id', finance.spending.read);
                app.del('/:id', finance.spending.del);
            });
        }); 
    });    
};
