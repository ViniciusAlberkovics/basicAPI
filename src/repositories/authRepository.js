const mongoose = require('mongoose');
const User = mongoose.model('user');

exports.create = async (userParam) => {
    let user = new User(userParam);
    let returnUser = await user.save();
    return returnUser;
}

exports.login = async (email) => {
    let login = await User.findOne({ email: email });
    return login;
}

exports.getById = async (id) => {
    let user = await User.findById(id);
    return user;
}