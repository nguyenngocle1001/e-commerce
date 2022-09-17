const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mongooseDelete = require('mongoose-delete');
const Email = require('../utils/email');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please tell us your name!'],
    },
    gender: {
      type: Boolean,
      default: true,
    },
    address: {
      type: String,
    },
    birthday: Date,
    phone: {
      type: String,
      validate: [
        validator.isMobilePhone,
        'Please provide correct phone number!',
      ],
    },
    email: {
      type: String,
      lowercase: true,
    },
    userID: String,
    photo: {
      type: String,
      validate: [validator.isURL, 'A photo must be a URL!'],
    },
    role: {
      type: String,
      enum: {
        values: ['user', 'employee', 'manager', 'admin'],
        message: 'This permission was not found!',
      },
      default: 'user',
    },
    description: String,
    password: {
      type: String,
      minlength: [8, 'A password must be at least 8 characters'],
      select: false,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    provideId: {
      type: String,
      default: 'signin',
      enum: ['signin', 'google', 'facebook'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  }
);

// Plugin
// - mongoose-delete
userSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
  validateBeforeDelete: true,
});

// Hash password
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password
userSchema.methods.comparePassword = async (password, currentPassword) =>
  await bcrypt.compare(password, currentPassword);

// Check password changed
userSchema.methods.checkPasswordChanged = function (JWTIssueAtTime) {
  if (!this.passwordChangedAt) return false;

  return this.passwordChangedAt.getTime() > JWTIssueAtTime * 1000;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

userSchema.pre('save', function (next) {
  this.wasNew = this.isNew;
  next();
});

userSchema.post('save', async function (next) {
  if (this.provideId === 'signin' && this.wasNew) {
    new Email(this).sendWelcome();
  }
});

module.exports = mongoose.model('User', userSchema);
