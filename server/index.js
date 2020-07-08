const io = require('socket.io')();
var Gaia = require('./gaia.js');
var allClients = [];

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }


const signed = randomIntFromInterval(0,9999999)


gaia = new Gaia(signed);

io.on('connection', socket => { 

  allClients.push(socket);

  socket.on('disconnect', function() {
    console.log('Got disconnect!');

    var i = allClients.indexOf(socket);
    gaia.partyDisconnect(socket.userData);
    delete socket.userData;
    allClients.splice(i, 1);
  });

  socket.on('dropCard', (data) => {
    gaia.dropCardParty(data);
  })

  socket.on('create', (data) => {
    socket.userData = gaia.createUser(socket,data);
  });

  socket.on('connect', (data) => {
    socket.userData = gaia.connectUser(socket,data);
  });

 });

io.listen(12000);

gaia.loadGame();
setInterval(() => {
  gaia.saveGame();
}, 60000*2);


console.log('gaia Server Running')