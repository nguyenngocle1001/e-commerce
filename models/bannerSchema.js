const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Banner = new mongoose.Schema(
  {
    image: {
      type: String,
    },
    keyword: {
      type: String,
      required: [true, 'Please provide a keyword for banner'],
    },
    startDate: {
      type: Date,
      required: [true, 'A banner must have a start date'],
    },
    endDate: {
      type: Date,
      required: [true, 'A banner must have an expiration date'],
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

Banner.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});

module.exports = mongoose.model('Banner', Banner);
