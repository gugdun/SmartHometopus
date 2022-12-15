const { v4: uuid } = require('uuid');
const express = require('express');
const router = express.Router();

const AuthMiddleware = require('../middleware/auth');
const Device = require('../models/device');

router.use('/auth', require('./auth'));
router.use('/devices', AuthMiddleware(true), require('./devices'));

router.head('/v1.0', function (req, res) {
  res.end();
});

router.get('/v1.0/user/devices', AuthMiddleware(true), async function (req, res) {
  const result = {
    request_id: uuid(),
    payload: {
      user_id: '1',
      devices: []
    }
  };

  const devices = await Device.findAll();

  result.payload.devices.push({
    id: devices[0].id + '0',
    name: 'Красная лампочка',
    description: 'Прикольный девайс вообще-то',
    room: 'Кухня',
    type: 'devices.types.light',
    capabilities: [
      {
        type: 'devices.capabilities.on_off',
        retrievable: true,
        reportable: false,
        parameters: {
          split: false
        }
      }
    ]
  });

  result.payload.devices.push({
    id: devices[0].id + '1',
    name: 'Желтая лампочка',
    description: 'Прикольный девайс вообще-то',
    room: 'Кухня',
    type: 'devices.types.light',
    capabilities: [
      {
        type: 'devices.capabilities.on_off',
        retrievable: true,
        reportable: false,
        parameters: {
          split: false
        }
      }
    ]
  });

  result.payload.devices.push({
    id: devices[0].id + '2',
    name: 'Зеленая лампочка',
    description: 'Прикольный девайс вообще-то',
    room: 'Кухня',
    type: 'devices.types.light',
    capabilities: [
      {
        type: 'devices.capabilities.on_off',
        retrievable: true,
        reportable: false,
        parameters: {
          split: false
        }
      }
    ]
  });

  res.json(result);
});

router.post('/v1.0/user/devices/query', AuthMiddleware(true), async function (req, res) {
  const result = {
    request_id: uuid(),
    payload: {
      devices: []
    }
  };

  const id = req.body.devices[0].id + '';
  const device = await Device.findOne({where: {id: Number(id.substring(0, id.length - 1))}});

  let resp, json;
  try {
    resp = await fetch(`http://${device.ip}/`);
    json = await resp.json();
  } catch (error) {}

  console.log(json);

  result.payload.devices.push({
    id: id,
    capabilities: [
      {
        type: 'devices.capabilities.on_off',
        state: {
          instance: 'on',
          value: json[Number(id.substring(id.length - 1))].value
        }
      }
    ]
  });

  res.json(result);
});

router.post('/v1.0/user/devices/action', async function (req, res) {
  const result = {
    request_id: uuid(),
    payload: {
      devices: []
    }
  };

  const id = req.body.payload.devices[0].id + '';
  const device = await Device.findOne({where: {id: Number(id.substring(0, id.length - 1))}});
  const func = ['switch_red','switch_yellow','switch_green'].at(Number(id.substring(id.length - 1)));

  try {
    const resp = await fetch(`http://${device.ip}/functions/${func}`, {
      method: 'POST',
      body: JSON.stringify({
        value: req.body.payload.devices[0].capabilities[0].state.value
      })
    });
    const json = await resp.json();
    console.log(json);
  } catch (error) {}

  result.payload.devices.push({
    id: id,
    capabilities: [
      {
        type: 'devices.capabilities.on_off',
        state: {
          instance: 'on',
          action_result: {
            status: 'DONE'
          }
        }
      }
    ],
  });

  res.json(result);
});

router.post('/v1.0/user/unlink', function (req, res) {
  res.end();
});

module.exports = router;