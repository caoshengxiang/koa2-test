const mongoose = require('../db')
const Schema = mongoose.Schema

const rclSchema = Schema({
  VESSEL: String, //
  VOYAGE: String, //
  POL_NAME_EN: String, //
  POD_NAME_EN: String, //
  ETD: String, //
  ETA: String, //
  TRANSIT_TIME: String, //
  IS_TRANSIT: Number, //
  LPA: String,
  FLAG: String,
  pol: String,
  pod: String,
  useTime: Number,
  date: String,
})

module.exports = mongoose.model('rcl', rclSchema)
