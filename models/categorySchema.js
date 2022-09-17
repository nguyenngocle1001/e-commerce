const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Category = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A category must be a name'],
      unique: true,
    },
    description: String,
    image: String,
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

Category.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});

module.exports = mongoose.model('Category', Category);
