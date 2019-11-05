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
  IS_TRANSIT: String, //
  LPA: String,
  FLAG: String,
})

module.exports = mongoose.model('rcl', rclSchema)
