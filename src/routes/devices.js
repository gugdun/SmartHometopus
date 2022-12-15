const express = require('express');
const router = express.Router();

const Device = require('../models/device');

router.get('/', async (req, res) => {
  try {
    const devices = await Device.findAll();
    res.json({
      success: true,
      result: devices
    });
  } catch (error) {
    res.json({
      error_code: error.code,
      error_message: error.message
    });
  }
});

router.get('/:device_id', async (req, res) => {
  try {
    const states = await State.findAll({
      include: {
        model: Device,
        where: {
          id: req.params.device_id
        }
      }
    });
    res.json({
      success: true,
      result: states
    });
  } catch (error) {
    res.json({
      error_code: error.code,
      error_message: error.message
    });
  }
});

router.delete('/:device_id', async (req, res) => {
  try {
    await Device.destroy({
      where: {
        id: req.params.device_id
      }
    });
    res.json({
      success: true,
      result: {
        id: req.params.device_id
      }
    });
  } catch (error) {
    res.json({
      error_code: error.code,
      error_message: error.message
    });
  }
});

router.use('/:device_id/functions', require('./functions'));

module.exports = router;