const io = require('socket.io')();
var Gaia = require('./gaia.js');
var allClients = [];

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }


const signed = randomIntFromInterval(0,999999999999999)


gaia = new Gaia(signed);

io.on('connection', socket => { 

  allClients.push(socket);

  socket.on('disconnect', function() {
    var i = allClients.indexOf(socket);
    gaia.partyDisconnect(socket.userData);
    delete socket.userData;
    allClients.splice(i, 1);
  });

  socket.on('disconnectParty', function() {
    gaia.partyDisconnect(socket.userData);
  });

  socket.on('imageUpload', function(data) {
    io.sockets.emit('newCard',{ data: gaia.createCard(data)});
    socket.emit('actualizUser',{data: gaia.getUser(data.username)})
  })

  socket.on('dropCard', (data) => {
    gaia.dropCardParty(data);
  })

  socket.on('matchmaking', (data) => {
    gaia.searchMatchmaking(socket,data);
  })

  socket.on('buyCard', (data) => {
    gaia.buyCard(socket,data);
  })


  socket.on('getListCard', (data) => {
    gaia.getListCard(socket,data);
  })

  socket.on('deleteCard', (data) => {
    gaia.deleteCard(socket,data);
  })
  socket.on('getMyListCard', (data) => {
    gaia.getMyListCard(socket,data);
  })

  socket.on('create', (data) => {
    socket.userData = gaia.createUser(socket,data);
  });

  socket.on('connected', (data) => {
    socket.userData = gaia.connectUser(socket,data);
  });

 });

io.listen(12000);

gaia.loadGame();
setInterval(() => {
  gaia.saveGame();
}, 60000*10);


console.log('gaia Server Running')