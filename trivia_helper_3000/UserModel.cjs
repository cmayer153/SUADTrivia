const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true }
});

// Hash password before saving
userSchema.methods.setPassword = function(password) {
    this.passwordHash = crypto.createHash('sha256').update(password).digest('hex');
};

userSchema.methods.verifyPassword = function(password) {
    const hash = crypto.createHash('sha256').update(password).digest('hex');
    return this.passwordHash === hash;
};

const User = mongoose.model('User', userSchema);

module.exports = User;