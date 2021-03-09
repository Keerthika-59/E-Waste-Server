module.exports = (app) => {
    const reps = require('../controllers/repController.js');

    app.post('/reps', reps.create);

    app.get('/reps', reps.getAll);

    // Retrieve a single Note with noteId
    app.get('/reps/:repId', reps.findOne);

    // Update a Note with noteId
    app.put('/reps/:repId', reps.update);

    // Delete a Note with noteId
    app.delete('/reps/:repId', reps.delete);

}