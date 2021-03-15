module.exports = (app) => {
    const contacts = require('../controllers/contactController.js');
 
    app.post('/contacts', contacts.create);
 
    app.get('/contacts', contacts.getAll);

 }
