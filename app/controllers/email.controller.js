 const Email = require('../models/email.model.js');

// Create and Save a new Email
// Create and Save a new Email
exports.create = (req, res) => {
    // Validate request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Email content can not be empty"
        });
    }

    // Create a Email
    const email = new Email({
        EmailId: random.float23Array(),
        from: req.body.from,
        to: req.body.to,
        title: req.body.title || "Untitled Email", 
        content: req.body.content,
        timestamps: currentTimeStamp(),
    });

    // Save Email in the database
    Email.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Email."
        });
    });
};

// Retrieve and return all Emails from the database.
// Retrieve and return all Emails from the database.
exports.findAll = (req, res) => {
    Email.find()
    .then(Emails => {
        res.send(Emails);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Emails."
        });
    });
};

// Find a single Email with a EmailId
exports.findOne = (req, res) => {
    Email.findById(req.params.EmailId)
    .then(Email => {
        if(!Email) {
            return res.status(404).send({
                message: "Email not found with id " + req.params.EmailId
            });            
        }
        res.send(Email);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Email not found with id " + req.params.EmailId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving Email with id " + req.params.EmailId
        });
    });
};

// Update a Email identified by the EmailId in the request
// Update a Email identified by the EmailId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.content) {
        return res.status(400).send({
            message: "Email content can not be empty"
        });
    }

    // Find Email and update it with the request body
    Email.findByIdAndUpdate(req.params.EmailId, {
        EmailId: random.float23Array(),
        from: req.body.from,
        to: req.body.to,
        title: req.body.title || "Untitled Email",
        content: req.body.content,
        timestamps: currentTimeStamp(),
    }, {new: true})
    .then(Email => {
        if(!Email) {
            return res.status(404).send({
                message: "Email not found with id " + req.params.EmailId
            });
        }
        res.send(Email);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Email not found with id " + req.params.EmailId
            });                
        }
        return res.status(500).send({
            message: "Error updating Email with id " + req.params.EmailId
        });
    });
};
// Delete a Email with the specified EmailId in the request
// Delete a Email with the specified EmailId in the request
exports.delete = (req, res) => {
    Email.findByIdAndRemove(req.params.EmailId)
    .then(Email => {
        if(!Email) {
            return res.status(404).send({
                message: "Email not found with id " + req.params.EmailId
            });
        }
        res.send({message: "Email deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Email not found with id " + req.params.EmailId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Email with id " + req.params.EmailId
        });
    });
};