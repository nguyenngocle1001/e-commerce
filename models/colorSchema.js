const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const colorSchema = new mongoose.Schema(
  {
    value: {
      type: String,
      required: [true, 'A color must be a value'],
      unique: true,
    },
    description: String,
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

colorSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
  validateBeforeDelete: true,
});

module.exports = mongoose.model('Color', colorSchema);
