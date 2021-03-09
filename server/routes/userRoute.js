module.exports = (app) => {
    const users = require('../controllers/userController.js');

    app.post('/users', users.create);

    app.get('/users', users.getAll);

    // Retrieve a single Note with noteId
    app.get('/users/:userId', users.findOne);

    // Update a Note with noteId
    app.put('/users/:userId', users.update);

    // Delete a Note with noteId
    app.delete('/users/:userId', users.delete);

}