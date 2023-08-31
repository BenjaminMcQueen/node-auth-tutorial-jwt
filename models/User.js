const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'please enter a password'],
        minlength: [6, 'minimum password length is 6 characters']
    },
});

// fire a funciton after doc saved to db
userSchema.post('save', function (doc, next) {
    console.log('new user was created and saved');
    next();
});

// fire a function before doc saved to db
userSchema.pre('save', function (next) {
    console.log('user soon to be created and saved', this);
    next();
})

const User = mongoose.model('user', userSchema);

module.exports = User;