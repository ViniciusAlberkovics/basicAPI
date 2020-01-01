const jwt = require('../helpers/jwt');
const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.get = (req, res) => {
    res.json({ message: 'foi' });
};

exports.post = (req, res) => {
    let user = new User(req.body);
    user.save()
        .then(u => {
            let token = jwt.sign({ id: u._id, name: u.name, email: u.email });
            res.status(201).json({ token });
        })
        .catch(e => {
            res.status(400).json({ message: 'E-mail already registered', data: e });
        });
};

exports.put = (req, res) => {
    res.json({ params: req.params, message: 'No idea' });
};

exports.del = (req, res) => {
    res.json({ message: 'No idea' });
};

exports.patch = (req, res) => {
    res.json({ message: 'No idea' });
};

exports.login = (req, res) => {
    User.findOne({ email: req.body.email })
        .then(u => {
            if (u) {
                if (u.password === req.body.password) {
                    if (u.active) {
                        let token = jwt.sign({ id: u._id, name: u.name, email: u.email });
                        res.status(200).json({ token });
                    } else {
                        res.status(400).json({ message: 'Inactive user.' });
                    }
                } else {
                    res.status(400).json({ message: 'Incorrect password.' });
                }
            } else {
                res.status(400).json({ message: 'Unregistered user.' });
            }
        })
        .catch(e => {
            throw e;
        });
}