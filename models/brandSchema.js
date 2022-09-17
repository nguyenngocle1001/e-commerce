const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Brand = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A brand must have a name'],
      unique: true,
    },
    description: String,
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

Brand.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});

module.exports = mongoose.model('Brand', Brand);
