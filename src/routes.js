const routes = require('express').Router();
const feeding = require('./controllers/feeding');

routes.get('/feeding/list', feeding.list);
routes.post('/feeding/create', feeding.create);
routes.post('/feeding/update', feeding.update);
routes.delete('/feeding/delete', feeding.delete);

module.exports = routes;