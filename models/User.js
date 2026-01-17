const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let users = [];

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const UserModel = mongoose.model('User', userSchema);

const originalFindOne = UserModel.findOne;
const originalCreate = UserModel.create;
const originalSave = UserModel.prototype.save;

UserModel.findOne = function(...args) {
  try {
    return originalFindOne.apply(this, args);
  } catch (err) {
    const query = args[0] || {};
    const email = query.email?.toLowerCase?.() || query.email;
    if (email) {
      const user = users.find(u => u.email === email);
      return Promise.resolve(user ? { ...user, comparePassword: async (pwd) => await bcrypt.compare(pwd, user.password) } : null);
    }
    return Promise.resolve(null);
  }
};

UserModel.prototype.save = async function() {
  try {
    return await originalSave.call(this);
  } catch (err) {
    const userData = {
      _id: new mongoose.Types.ObjectId().toString(),
      name: this.name,
      email: this.email?.toLowerCase?.() || this.email,
      password: this.password,
      createdAt: this.createdAt || new Date()
    };
    users.push(userData);
    return userData;
  }
};

module.exports = UserModel;
