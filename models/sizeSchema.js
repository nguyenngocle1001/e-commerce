const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const sizeSchema = new mongoose.Schema(
  {
    value: {
      type: String,
      required: [true, 'A size must be a value'],
      unique: true,
    },
    description: String,
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

sizeSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
  validateBeforeDelete: true,
});

module.exports = mongoose.model('Size', sizeSchema);
