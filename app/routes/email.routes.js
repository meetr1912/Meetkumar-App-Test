module.exports = (app) => {
    const email = require('../controllers/email.controller.js');

    // Create a new Note
    app.post('/email', email.create);

    // Retrieve all Notes
    app.get('/email', email.findAll);

    // Retrieve a single Note with noteId
    app.get('/emails/:email', email.findOne);

    // Update a Note with noteId
    app.put('/emails/:email', email.update);

    // Delete a Note with noteId
    app.delete('/emails/:email', email.delete);
}