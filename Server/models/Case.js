const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const caseSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    description: {
      type: String,
      required: true,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    imgName: String,
    url: {
      type: String,
    },
    symptoms: String,
    timeframe:String,
    urgencyLevel:Number,
    rateOfPain:Number,
    systolic: Number,
    diastolic: Number,
    pulse: Number,
    oxygen: Number,
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  },
);

const Case = mongoose.model('Case', caseSchema);
module.exports = Case;
