const routes = require('express').Router();
const feeding = require('./controllers/feeding');
const dashboard = require('./controllers/dashboard');

routes.get('/feeding/list', feeding.list);
routes.get('/feeding/manual', feeding.manual);
routes.post('/feeding/create', feeding.create);
routes.post('/feeding/update', feeding.update);
routes.delete('/feeding/delete', feeding.delete);

routes.get('/dashboard', dashboard.get);

module.exports = routes;