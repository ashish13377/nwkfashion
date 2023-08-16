const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const adminUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

adminUserSchema.pre('save', async function (next) {
    const adminUser = this;
    if (!adminUser.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(adminUser.password, salt);
    adminUser.password = hash;
    next();
});

const AdminUser = mongoose.model('AdminUser', adminUserSchema);

module.exports = AdminUser;
