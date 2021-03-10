module.exports = (app) => {
    const users = require('../controllers/userController.js');

    app.post('/users', users.create);

    app.get('/users', users.getAll);

    app.get('/users/:userId', users.findOne);

    app.put('/users/:userId', users.update);

    app.delete('/users/:userId', users.delete);

}