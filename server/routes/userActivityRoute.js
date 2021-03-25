module.exports = (app) => {
    const userAct = require('../controllers/userActivityController.js');
    
    // create new activity for a user
    app.post('/activity/:id', userAct.createActivity);

    app.get('/userAct', userAct.getAll);

    app.get('/activities/pending', userAct.getPendingActivities);
    app.get('/activities/completed', userAct.getCompletedActivities);
    
    // app.get('/activity/complete/:id',  )
    
    // Retrieve a single Note with noteId
    app.get('/userAct/:actId', userAct.findOne);

    // Update a Note with noteId
    app.put('/userAct/:actId', userAct.update);

    // Delete a Note with noteId
    app.delete('/userAct/:actId', userAct.delete);

}