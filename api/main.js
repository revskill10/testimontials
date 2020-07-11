const Promise = require('bluebird');
Promise.promisifyAll(require('node-odoo').prototype);

const Odoo = require('odoo-xmlrpc');


const odoo = new Odoo({
    url: 'http://localhost',
    port: '8069',
    db: 'test',
    username: 'odoo',
    password: 'odoo'
});


var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000;
this.router = express.Router();
app.listen(port);

console.log('todo list RESTful API server started on: ' + port);


this.router.get('/api/event/', (req, res) => {
    return getEvent(req, res);
});

app.get('/api/order-item/create', (req, res) => {

    odoo.connect(function (err) {
if (err) { return console.log(err); }
console.log('Connected to Odoo server.');
var inParams = [];
inParams.push({
'product_id': 13,
'price_unit' :  800.4,
'qty' : 2,
'price_subtotal' : 1600.8,
'price_subtotal_incl' :1600.8
})
var params = [];
params.push(inParams);
odoo.execute_kw('pos.order.line', 'create', params, function (err, value) {
if (err) { return console.log(err); }
console.log(value);
res.send('order item created')
});
});
    
})
app.get('/getEvent', (request, response) => {
        odoo.connect((err) => {
            if(err)  return console.log('Findeventlist error ' + JSON.stringify(err));
            console.log('Findeventlist connected ' );
            var inParams = [];
            inParams.push('read');
            inParams.push(false); //raise_exception
            var params = [];
            params.push(inParams);
            odoo.execute_kw('res.partner', 'check_access_rights', params, function (err, value) {
                if (err) { return console.log(err); }
                console.log('Result: ', value);
                return response.status(200).json(value)
            });
        });
        console.log(' odoo connected');
})