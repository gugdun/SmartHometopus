const express = require('express');
const router = express.Router({ mergeParams: true });

const Device = require('../models/device');
const Function = require('../models/function');
const Parameter = require('../models/parameter');

router.get('/', async (req, res) => {
  try {
    const funcs = await Function.findAll({
      include: [
        {
          model: Device,
          where: {
            id: req.params.device_id
          }
        },
        { model: Parameter }
      ]
    });
    res.json({
      success: true,
      result: funcs
    });
  } catch (error) {
    res.json({
      error_code: error.code,
      error_message: error.message
    });
  }
});

router.post('/:func_id', async (req, res) => {
  try {
    res.json({
      success: true,
      result: {
        id: req.params.func_id
      }
    });
  } catch (error) {
    res.json({
      error_code: error.code,
      error_message: error.message
    });
  }
});

module.exports = router;