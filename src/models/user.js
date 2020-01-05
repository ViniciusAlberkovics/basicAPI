const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    email: {
        type: String,
        required: true,
        index: true,
        unique: true,
        validate: {
            validator: function (email) {
                return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/gi.test(email);
            },
            message: props => `${props.value} is not a valid email`
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: 8
    },
    name: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
        default: true
    },
    roles: [{
        type: String,
        required: true,
        enum: ['user', 'admin', 'others'],
        validate: {
            validator: function (roles) {
                if (roles.length === 0)
                    return false
                else return true
            }
        }
    }]
});

module.exports = mongoose.model('user', schema, 'user');