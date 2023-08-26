const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const adminUserSchema = new mongoose.Schema({
    Companyname: {
        type: String,
        default: "Please Update Profile"
    },
    Adminname: {
        type: String,
        default: "Please Update Profile"
    },
    phone: {
        type: String,
        default: "Please Update Profile"
    },
    dateofBirth:{
        type: String,
        default: "1980-08-10"
    },
    companyaddres:{
        type: String,
        default: "Please Update Profile"
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
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
});

adminUserSchema.pre('save', async function (next) {
    const adminUser = this;
    if (!adminUser.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(adminUser.password, salt);
    adminUser.password = hash;
    next();
});

adminUserSchema.methods.generateAuthToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id }, process.env.JWT_TOKEN);
        this.tokens = this.tokens.concat({ token });
        await this.save();
        return token;
    } catch (err) {
        return false;
    }
};

const AdminUser = mongoose.model('AdminUser', adminUserSchema);

module.exports = AdminUser;
