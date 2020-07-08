var jwt = require('jsonwebtoken');
var timeExpiration = 60000*60
var fs = require('fs');
const User = require('./user');
const FirstDeck = require('./firstDeck');


function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }


//ownerVerified = jwt.verify(req.body.vin.owner, 'shhhhhh');
class Gaia {

    constructor(signed){
        /*this.village = village;
        this.signed = signed;
        this.userModule = new User(signed);*/
        this.listUser = {};
        this.firstDeck = new FirstDeck(() => this.getAleatCard());
        this.listCard = {};//this.firstDeck.firstCreateCard();
        this.listMatchmaking = {};
        this.listParty = {};
        
    }


    saveGame(){
      var listUser = {};
      for (const [key, value] of Object.entries(this.listUser)) {
        //console.log(`${key}: ${value}`);
        //console.log(value);
        var save = this.clearOneUserForEmit(value);
        listUser[key] = Object.assign({},value)
        this.reloadOneUserData(value,save);
      }

      try {
        let data = JSON.stringify(listUser);
        fs.writeFile('listUser.json', data, (err) => {
            if (err) throw err;
        });
      } catch (err) {
          console.error(err);
      }

      try {
        let data = JSON.stringify(this.listCard);
        fs.writeFile('listCard.json', data, (err) => {
            if (err) throw err;
            console.log('Data written to file');
        });
      } catch (err) {
          console.error(err);
      }
    }

    loadGame(){
      fs.readFile('listUser.json', (err, data) => {
        if (err) throw err;
        var dataNow = JSON.parse(data);
        this.listUser = dataNow;
      });
      fs.readFile('listCard.json', (err, data) => {
        if (err) throw err;
        var dataNow = JSON.parse(data);
        this.listCard = dataNow;
      });
    }

    createCard(card){
      var card = {
        name:card.name,
        point:card.point,
        cost:card.cost,
        race:card.race,
        img:card.img,
        skill:{
          type:card.skill.type,
          nbr:card.skill.nbr,
          race:card.skill.race,
          ligne:card.skill.ligne,
        }
      }
      return card;
    }

    totalPointUser(user){
      var point = 0;
      for (let index = 0; index < Object.keys(user.cards).length; index++) {
        point += user.cards[index].cost;
      }
      return point;
    }

    partyDisconnect(user){//console.log(user)
      if(user){
        if(user.party){
          if(user.party.user[0] ){
            var user0 = user.party.user[0];
            if(user.party.user[0].name != user.name){
              user0.socket.emit('disconnectParty', { party: {} });
              delete user0.party;
            }
          }
        }
        if(user.party){
          if(user.party.user[1]){
            var user1 = user.party.user[1];
            if(user.party.user[1].name != user.name){
              user1.socket.emit('disconnectParty', { party: {} });
              delete user1.party;
            }
          }
        }
      }
    }

    dropCardParty(data){
      if(this.listUser[data.username]){
        if(this.listUser[data.username].party){
          //drop card
          var party = this.listUser[data.username].party;
          if(party.user[0].name === data.username && party.turn === 0 && parseInt(data.pos) <= 9){
            party.table[data.pos] = data.card.obj;
            party.turn = 1;
            delete party.user[0].main[data.card.id];
          }else if(party.user[1].name === data.username && party.turn === 1 && parseInt(data.pos) >= 10){
            party.table[data.pos] = data.card.obj;
            party.turn = 0;
            delete party.user[1].main[data.card.id];
          }
          //point counter party
          var point0 = 0;
          Object.keys(party.table).map(card => {
            if(parseInt(card) <= 9){
              if(party.table[parseInt(card)])
                point0 += party.table[parseInt(card)].point
            }
          })
          var point1 = 0;
          Object.keys(party.table).map(card => {
            if(parseInt(card) >= 10){
              if(party.table[parseInt(card)])
                point1 += party.table[parseInt(card)].point
            }
          })
          party.point0 = point0;
          party.point1 = point1;

          //round victory
          if(Object.keys(party.user[0].main).length <= 0 && 
          Object.keys(party.user[1].main).length <= 0 ){
            
            if(party.point0 > party.point1)
              party.victory0++;
            if(party.point1 > party.point0)
              party.victory1++;
            
            party.round += 1;
            this.setMain(party.user[0]);
            this.setMain(party.user[1]);
            party.table= {
              1:null,2:null,3:null,4:null,5:null,
              6:null,7:null,8:null,9:null,10:null,
              11:null,12:null,13:null,14:null,15:null,
              16:null,17:null,18:null,19:null,20:null,
            }
            party.point0 = 0;
            party.point1 = 0;
            //final victory
            if(party.victory1 >= 2 || party.victory0 >= 2){
              if(party.victory0 >= 2)
                party.user[0].monaie++
              if(party.victory1 >= 2)
                party.user[1].monaie++
              this.partyDisconnect(party.user[0])
            }
          }

          //send party
          var save = this.clearTwoUserForEmit(party.user[0],party.user[1]);

          save.socket0.emit('party', { party: party });
          save.socket1.emit('party', { party: party });

          this.reloadTwoUserData(party.user[0],party.user[1],save);
        }
      }
    }

    setMain(user){
      var deck = this.listUser[user.username].cards;
      var array = Object.keys(deck);
      var main = {
        1:Object.assign({},deck[array[Math.floor(Math.random()*array.length)]]),
        2:Object.assign({},deck[array[Math.floor(Math.random()*array.length)]]),
        3:Object.assign({},deck[array[Math.floor(Math.random()*array.length)]]),
        4:Object.assign({},deck[array[Math.floor(Math.random()*array.length)]]),
        5:Object.assign({},deck[array[Math.floor(Math.random()*array.length)]]),
        6:Object.assign({},deck[array[Math.floor(Math.random()*array.length)]]),
        7:Object.assign({},deck[array[Math.floor(Math.random()*array.length)]]),
        8:Object.assign({},deck[array[Math.floor(Math.random()*array.length)]]),
        9:Object.assign({},deck[array[Math.floor(Math.random()*array.length)]]),
        10:Object.assign({},deck[array[Math.floor(Math.random()*array.length)]]),
      };
      main[1].id = 1;
      main[2].id = 2;
      main[3].id = 3;
      main[4].id = 4;
      main[5].id = 5;
      main[6].id = 6;
      main[7].id = 7;
      main[8].id = 8;
      main[9].id = 9;
      main[10].id = 10;
      this.listUser[user.username].main = main;
      //return main;
    }

    searchMatchmaking(socket,data){
      if(!this.listMatchmaking[data.user.username])
        this.listMatchmaking[data.user.username]={
          other:null,
          me:this.listUser[data.user.username],
          point:this.totalPointUser(this.listUser[data.user.username]),
        };

        
      for (let index = 0; index < Object.keys(this.listMatchmaking).length; index++) {
        if(this.listMatchmaking[data.user.username].point <= this.listMatchmaking[Object.keys(this.listMatchmaking)[index]].point+50 &&
        this.listMatchmaking[data.user.username].point >= this.listMatchmaking[Object.keys(this.listMatchmaking)[index]].point-50 && 
        this.listUser[Object.keys(this.listMatchmaking)[index]]){
          if (this.listMatchmaking[data.user.username].me.name != this.listMatchmaking[Object.keys(this.listMatchmaking)[index]].me.name){
            
            var party = this.listParty[this.listMatchmaking[data.user.username].me.name+'-'+this.listUser[Object.keys(this.listMatchmaking)[index]].name] ={
              user : {
                0:this.listMatchmaking[data.user.username].me,
                1:this.listUser[Object.keys(this.listMatchmaking)[index]],
              },
              round : 0,
              victory0 : 0,
              victory1 : 0,
              turn: 0,
              point0:0,
              point1:0,
              table:{
                1:null,2:null,3:null,4:null,5:null,
                6:null,7:null,8:null,9:null,10:null,
                11:null,12:null,13:null,14:null,15:null,
                16:null,17:null,18:null,19:null,20:null,
              }
            }

            this.listMatchmaking[data.user.username].me.party = party;
            this.listUser[Object.keys(this.listMatchmaking)[index]].party = party;
            
            var save = this.clearTwoUserForEmit(party.user[0],party.user[1]);

            save.socket0.emit('party', { party: party });
            save.socket1.emit('party', { party: party });

            this.reloadTwoUserData(party.user[0],party.user[1],save);

            delete this.listMatchmaking[data.user.username];
            delete this.listMatchmaking[this.listUser[Object.keys(this.listMatchmaking)[index]]];
            return party.table;
          }
        }
      }
      
    }

    clearOneUserForEmit(user){
      var socketAndParty = {
        socket : user.socket,
        party : user.party,
      };
      user.socket = {};
      user.party = {};
      return socketAndParty;
    }

    reloadOneUserData(user,save){
      user.socket = save.socket;
      user.party = save.party;
    }

    clearTwoUserForEmit(user0,user1){
      var socketAndParty = {
        socket0 : user0.socket,
        socket1 : user1.socket,
        party : user0.party,
      };
      user0.socket = {};
      user1.socket = {};
      user0.party = {};
      user1.party = {};
      return socketAndParty;
    }

    reloadTwoUserData(user0,user1,save){
      user0.socket = save.socket0;
      user1.socket = save.socket1;
      user0.party = save.party;
      user1.party = save.party;
    }

    getAleatCard(){
      var array = Object.keys(this.listCard);
      return this.listCard[array[Math.floor(Math.random() * array.length)]];
    }

    connectUser(socket,data){
      if(this.listUser[data.user.username]){
        this.listUser[data.user.username].socket = socket;
        var user = {
          cards : this.listUser[data.user.username].cards,
          username : data.user.username,
        }
        socket.emit('createOk', { user: user });
        //jwt.sign({ user: req.body.user.username ,iat:Date.now() }, this.signed)
        return this.listUser[data.user.username];
      }
    }

    createUser(socket,data){
      if(!this.listUser[data.user.username]){
        this.listUser[data.user.username] = data.user;
        this.listUser[data.user.username].name = data.user.username;
        this.listUser[data.user.username].cards=this.firstDeck.createFirstDeck(data.user.username);
        this.listUser[data.user.username].socket = socket;
        this.listUser[data.user.username].monaie = 0;
        this.setMain(data.user);
        var user = {
          cards : this.listUser[data.user.username].cards,
          username : data.user.username,
        }
        socket.emit('createOk', { user: user });
        this.searchMatchmaking(socket,data);
        //jwt.sign({ user: req.body.user.username ,iat:Date.now() }, this.signed)
        return this.listUser[data.user.username];
      }
    }

}

module.exports = Gaia;

