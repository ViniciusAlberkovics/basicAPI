const md5 = require('md5');
const jwt = require('../helpers/jwt');
const repository = require('../repositories/authRepository');

exports.get = (req, res) => {
    return res.json({ message: 'foi c token' });
};

exports.post = async (req, res) => {
    try {
        req.body.password = md5(req.body.password)
        let u = await repository.create(req.body);
        let token = jwt.signUser(u);
        return res.status(201).json({ token });
    } catch (error) {
        return res.status(500).json({ message: 'Error', data: error });
    }
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

exports.login = async (req, res) => {
    try {
        let u = await repository.login(req.body.email);
        if (u) {
            if (u.password === md5(req.body.password)) {
                if (u.active) {
                    let token = jwt.signUser(u);
                    return res.status(200).json({ token });
                } else {
                    return res.status(400).json({ message: 'Inactive user.' });
                }
            } else {
                return res.status(400).json({ message: 'Incorrect password.' });
            }
        } else {
            return res.status(400).json({ message: 'Unregistered user.' });
        }
    } catch (error) {
        throw error;
    }
}

exports.refreshToken = async (req, res) => {
    try {
        let user = await repository.getById(req.userInfo.id);
        if (user) {
            if (user.active) {
                let token = jwt.signUser(user);
                return res.status(200).json({ token });
            } else {
                return res.status(400).json({ message: 'Inactive user.' });
            }
        } else {
            return res.status(400).json({ message: 'Unregistered user.' });
        }
    } catch (error) {
        throw error;
    }
}