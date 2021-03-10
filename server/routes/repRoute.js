module.exports = (app) => {
    const reps = require('../controllers/repController.js');

    app.post('/reps', reps.create);

    app.get('/reps', reps.getAll);

    app.get('/reps/:repId', reps.findOne);

    app.put('/reps/:repId', reps.update);

    app.delete('/reps/:repId', reps.delete);

}