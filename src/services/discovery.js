const dgram = require('dgram');
const Device = require('../models/device');
const socket = dgram.createSocket('udp4');

module.exports = {
  initialize: function() {
    socket.on('listening', function () {
      const address = socket.address();
      console.log('UDP socket listening on ' + address.address + ":" + address.port);
    });

    socket.on('message', async function (message, remote) {
      console.log('Received message: ', remote.address + ':' + remote.port +' - ' + message);
      const msg = 'connected';
      socket.send(msg, 0, msg.length, 1337, remote.address);
      if (await Device.findOne({ where: { ip: remote.address } }) == undefined) {
        await Device.create({
          name: message,
          ip: remote.address
        });
      }
    });

    socket.bind(1337);
  }
};