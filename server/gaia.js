var jwt = require('jsonwebtoken');
var timeExpiration = 60000*60
var fs = require('fs');
var slugify = require('slugify')
const User = require('./user');
const FirstDeck = require('./firstDeck');
//const { object } = require('prop-types');


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
        var cards = this.firstDeck.firstCreateCard();
        this.listCard = /*{}*/cards.listCard;
        this.listCardImg = /*{}*/cards.listCardImg;
        this.listMatchmaking = {};
        this.listParty = {};
        this.saveGame();
        
    }


    saveGame(){
      var listUser = {};
      for (const [key, value] of Object.entries(this.listUser)) {
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
        let data = JSON.stringify(this.listCardImg);
        fs.writeFile('listCardImg.json', data, (err) => {
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
      /*fs.readFile('listUser.json', (err, data) => {
        if (err) throw err;
        var dataNow = JSON.parse(data);
        this.listUser = dataNow;
      });
      fs.readFile('listCardImg.json', (err, data) => {
        if (err) throw err;
        var dataNow = JSON.parse(data);
        this.listCardImg = dataNow;
      });
      fs.readFile('listCard.json', (err, data) => {
        if (err) throw err;
        var dataNow = JSON.parse(data);
        this.listCard = dataNow;
      });*/
    }
    
    createCard(card){
      var slugyName = slugify(card.name);
      var newCard = {
        name:card.name,
        slug:slugyName,
        point:card.point,
        cost:card.cost,
        race:card.race,
        //img:card.file,
        skillMelee:{
          type:card.skillMelee,
          nbr:card.nombreMelee,
          ligne:card.lineMelee,
          val:card.skillMeleeVal,
        },
        skillDist:{
          type:card.skillDist,
          nbr:card.nombreDist,
          ligne:card.lineDist,
          val:card.skillDistVal,
        }
      }
      this.listCard[slugyName] = newCard;
      this.listUser[card.username].cards.push(newCard);

      this.listCardImg[slugyName] = card.file;
      var obj = {
        file : card.file,
        slug : slugyName,
      }
      return obj;
    }

    imageCardUpdate(card,slugyName){
      var fileName = __dirname + '/tmp/uploads/'+ slugyName +'.jpg';
      fs.open(fileName, 'a',/* 0755,*/ function(err, fd) {
          if (err) throw err;
          fs.writeFile(fileName, card.file, 'base64', function(err) {
            console.log(err);
          });
          fs.write(fd, card.file, null, 'Binary', function(err, written, buff) {
              fs.close(fd, function() {
                  console.log('File saved successful!');
              });
          })
      });
    }

    totalPointUser(user){
      var point = 0;
      for (let index = 0; index < Object.keys(user.cards).length; index++) {
        point += user.cards[index].cost;
      }
      return point;
    }

    partyDisconnect(user){
      if(user){
        if(user.party){
          if(user.party.user){
            if(user.party.user[0] ){
              if(user.party.user[0].name != user.name){
                user.party.user[0].socket.emit('disconnectParty', { party: {} });
                user.party.user[1].socket.emit('disconnectParty', { party: {} });
                delete user.party.user[0].party;
              }
            }
          }
        }
        if(user.party){
          if(user.party.user){
            if(user.party.user[1]){
              if(user.party.user[1].name != user.name){
                user.party.user[1].socket.emit('disconnectParty', { party: {} });
                user.party.user[0].socket.emit('disconnectParty', { party: {} });
                delete user.party.user[1].party;
              }
            }
          }
        }
      }
    }

    skillUse(card,party,pos,distmelee){
      /*<option value="1">No skill</option>
        <option value="2">Infliger {this.state.nombreMelee} de dégats à {this.state.lineMeleeVal} adverse</option>
        <option value="3">Donner {this.state.nombreMelee} point à {this.state.lineMeleeVal} allié</option>
        <option value="4">Cacher la carte à l'adversaire</option>
        <option value="5">Ajouter {this.state.nombreMelee} point sur cet carte par même race mise en jeu allié</option>
        <option value="6">Confere invulnérabitilité à {this.state.lineMeleeVal} allié pendant {this.state.nombreMelee} nombre de tour</option>
        <option value="7">Détruire toutes les carte énemies possédant {this.state.nombreMelee} points</option>
        <option value="8">Invulnérable</option>
        <option value="9">Ajoute un point par carte supérieur mise sur la table</option>*/
        /*
      skillMelee: 1,
      lineMelee: 1,
      lineMeleeVal: 'une cible aléatoire',
      nombreMelee: 1,*/
      /*type:card.skillMelee,
      nbr:card.nombreMelee,
      ligne:card.lineMelee,
      val:card.skillMeleeVal,*/
      /*<option value="1">une cible aléatoire</option>
      <option value="2">une même race</option>
      <option value="3">ligne de distance</option>
      <option value="4">ligne de mélée</option>*/
      var animationArray = {};
      var cibleArray = null;
      //var distmelee = 'skillMelee'
      //enleve l'invulnérabilité par tour
      Object.keys(party.table).forEach(element => {
        if(party.table[element] !== null){
          if(party.table[element].invulnerable > 0)
          party.table[element].invulnerable -= 1
        }
      })

      //skill action
      if(card[distmelee]){
        if(card[distmelee].type === 2){//attack
          cibleArray = this.searchLine(card,party,1,distmelee);
          if(cibleArray){
            Object.keys(cibleArray).forEach(element => {
              cibleArray[element].point -= card[distmelee].nbr;
              animationArray[element] = 1;//attack
              if(cibleArray[element].point <= 0){
                animationArray[element] = 3;//destroy fumee
                party.table[element] = null;
              }
            });
          }
        }else if(card[distmelee].type === 3){//give point
          cibleArray = this.searchLine(card,party,0,distmelee);
          if(cibleArray){
            Object.keys(cibleArray).forEach(element => {
              animationArray[element] = 2;//heal
              cibleArray[element].point += card[distmelee].nbr;
            });
          }
        }else if(card[distmelee].type === 4){//hide card
          cibleArray[element].hided = 1;
        }else if(card[distmelee].type === 5){//give point me by same race
          cibleArray = [];
          Object.keys(party.table).forEach(element => {
            if(party.table[element] !== null){
              if(party.table[element].race === card.race)
                cibleArray[element] = party.table[element];
            }
          });
          animationArray[Object.keys(card)] = 2;//heal
          card.point += cibleArray.length;
        }else if(card[distmelee].type === 6){//give invulnerable while turn
          cibleArray = this.searchLine(card,party,0,distmelee);
          if(cibleArray){
            Object.keys(cibleArray).forEach(element => {
              animationArray[element] = 4;//give invulnerability
              cibleArray[element].invulnerable += card[distmelee].nbr;
            });
          }
        }else if(card[distmelee].type === 7){//destroy enemi card with number point
          cibleArray = [];
          Object.keys(party.table).forEach(element => {
            if(party.table[element] !== null){
              if(party.table[element].owner !== card.owner &&
              party.table[element].point === card[distmelee].nbr)
                cibleArray[element] = party.table[element];
            }
          });
          if(cibleArray){
            cibleArray.forEach(element => {
              animationArray[element] = 3;//destroy fumee
              element = null;
            });
          }
        }else if(card[distmelee].type === 8){//give invulnerable permanent
          animationArray[pos] = 4;//give invulnerability
          card.invulnerable = 99999
        }
      }else{
        console.log('error',card)
      }
      return animationArray;
    }

    searchLine(card,party,attack,distmelee){
      var cibleArray = {};
      if(card[distmelee].ligne === 1){//cible aléatoire
        var cibleArrayVar = {};
        Object.keys(party.table).forEach(element => {
          if(party.table[element] !== null && 
            ((party.table[element].owner !== card.owner && attack === 1) ||
            (party.table[element].owner === card.owner && attack === 0))){
            if(party.table[element].invulnerable === 0 || attack === 0)
            cibleArrayVar[element] = party.table[element];
          }
        });
        var rand = Math.floor(Math.random()*Object.keys(cibleArrayVar).length)
        var count = 0;
        Object.keys(cibleArrayVar).forEach(element => {
          if(count === rand){
            cibleArray[element] = cibleArrayVar[element];
          }
          count++;
        });
      }else if(card[distmelee].ligne === 2){//meme race
        Object.keys(party.table).forEach(element => {
          if(party.table[element] !== null && 
            ((party.table[element].owner !== card.owner && attack === 1) ||
            (party.table[element].owner === card.owner && attack === 0))){
            if(party.table[element].race === card.race){
              if(party.table[element].invulnerable === 0 || attack === 0)
                cibleArray[element] = party.table[element];
            }
          }
        });
      }else if(card[distmelee].ligne === 3){//ligne de distance
        Object.keys(party.table).forEach(element => {
          if(party.table[element] !== null && 
            ((party.table[element].owner !== card.owner && attack === 1) ||
            (party.table[element].owner === card.owner && attack === 0))){
            if(element >=1 &&  element <=5 || element >= 16 &&  element <= 20 ){
              if(party.table[element].invulnerable === 0 || attack === 0)
                cibleArray[element] = party.table[element];
            }
          }
        });
      }else if(card[distmelee].ligne === 4){//ligne de melee
        Object.keys(party.table).forEach(element => {
          if(party.table[element] !== null && 
            ((party.table[element].owner !== card.owner && attack === 1) ||
            (party.table[element].owner === card.owner && attack === 0))){
            if(element >=6 && element <=15 ){
              if(party.table[element].invulnerable === 0 || attack === 0)
              cibleArray[element] = party.table[element];
            }
          }
        });
      }
      return cibleArray;
    }

    dropCardParty(data){
      if(this.listUser[data.username]){
        if(this.listUser[data.username].party){
          //drop card
          var party = this.listUser[data.username].party;
          if(party.user[0].name === data.username && party.turn === 0 && parseInt(data.pos) <= 9 && !party.table[data.pos]){
            party.table[data.pos] = data.card.obj;
            if(parseInt(data.pos) >= 0 && parseInt(data.pos) <= 4){
              var distmelee = 'skillDist'
            }else if (parseInt(data.pos) >= 5 && parseInt(data.pos) <= 9){
              var distmelee = 'skillMelee'
            }
            party.lastAnim = this.skillUse(data.card.obj,party,data.pos,distmelee)
            party.turn = 1;
            delete party.user[0].main[data.card.id];
          }else if(party.user[1].name === data.username && party.turn === 1 && parseInt(data.pos) >= 10 && !party.table[data.pos]){
            party.table[data.pos] = data.card.obj;
            if(parseInt(data.pos) >= 10 && parseInt(data.pos) <= 14){
              var distmelee = 'skillMelee'
            }else if (parseInt(data.pos) >= 15 && parseInt(data.pos) <= 19){
              var distmelee = 'skillDist'
            }
            party.lastAnim = this.skillUse(data.card.obj,party,data.pos,distmelee)
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

    randomArrayShuffle(array) {
      var currentIndex = array.length, temporaryValue, randomIndex;
      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      return array;
    }

    setDeckForParty(user){
      this.listUser[user.username].deck = []
      this.listUser[user.username].cards.forEach(card => {
        this.listUser[user.username].deck.push(Object.assign({},card))
      });
    }

    setMain(user){//console.log(this.listUser[user.username].deck)
      var deck = this.randomArrayShuffle(this.listUser[user.username].deck)//this.listUser[user.username].deck.sort();
      //var array = Object.keys(deck);
      var main = {};
      for (let index = 1; index <= 10; index++) {
        //main[index] = Object.assign({},deck[array[Math.floor(Math.random()*array.length)]])
        main[index] = deck.shift();
        if(deck.length <= 0)
          this.setDeckForParty(user);
      }
      /*var main = {
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
      };*/
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
      try {
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
              this.setDeckForParty(party.user[0]);
              this.setDeckForParty(party.user[1]);
              this.setMain(party.user[0]);
              this.setMain(party.user[1]);

              var save = this.clearTwoUserForEmit(party.user[0],party.user[1]);
              
              save.socket0.emit('party', { party: party });
              save.socket1.emit('party', { party: party });

              this.reloadTwoUserData(party.user[0],party.user[1],save);
              
              delete this.listMatchmaking[party.user[0].name];
              delete this.listMatchmaking[party.user[1].name];

              return party.table;
            }
          }
        }
      } catch (error) {
        console.log(error)
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
        cards0 : user0.cards,
        cards1 : user1.cards,
        party : user0.party,
      };
      user0.socket = {};
      user1.socket = {};
      user0.cards = [];
      user1.cards = [];
      user0.party = {};
      user1.party = {};
      return socketAndParty;
    }

    reloadTwoUserData(user0,user1,save){
      user0.socket = save.socket0;
      user1.socket = save.socket1;
      user0.cards = save.cards0;
      user1.cards = save.cards1;
      user0.party = save.party;
      user1.party = save.party;
    }

    getAleatCard(){
      var array = Object.keys(this.listCard);
      return this.listCard[array[Math.floor(Math.random() * array.length)]];
    }

    getListCard(socket,data){
      var listCard = {};
      var page = 0;
      for (var card in this.listCard) {
        var nope = 0;
        if(parseInt(data.data.race) !== 0){
          if(data.data.race !== this.listCard[card].race)
            nope = 1;
        }
        if(parseInt(data.data.point) > 0 && parseInt(data.data.point) < 10){
          if(parseInt(data.data.point) !== parseInt(this.listCard[card].point))
            nope = 1;
        }
        if(parseInt(data.data.point) == 10 && parseInt(this.listCard[card].point) < 10)
          nope = 1;
        if(parseInt(data.data.cost) !== 0 && parseInt(this.listCard[card].cost) < parseInt(data.data.cost))
          nope = 1
        
        if(nope === 0){
          page += 0.2;
          if(Math.ceil(page) == data.data.page)
            listCard[card] = this.listCard[card];
        }
      }
      socket.emit('getListCard', { listCard: listCard ,nbr : Math.ceil(page)});
    }

    buyCard(socket,data){
      Object.keys(this.listCard).forEach(element => {
        if(this.listCard[element].slug === data.data.card.slug){
          var card = Object.assign({},this.listCard[element]);
          this.listUser[data.data.username].cards.push(card);
          this.listUser[data.data.username].monaie -= card.cost;
          data.data.card.slug = undefined;
        }
      });
      this.setDeckForParty(data.data);
      this.setMain(data.data);
      var save = this.clearOneUserForEmit(this.listUser[data.data.username]);
      var user = Object.assign({},this.listUser[data.data.username])
      this.reloadOneUserData(this.listUser[data.data.username],save);
      socket.emit('actualizUser',{data: user})
      this.getListCard(socket,data);
    }

    deleteCard(socket,data){
      for (let index = 0; index < this.listUser[data.data.username].cards.length; index++) {
        if(this.listUser[data.data.username].cards[index].slug === data.data.card.slug){
          this.listUser[data.data.username].monaie += this.listUser[data.data.username].cards[index].cost;
          this.listUser[data.data.username].cards.splice(index, 1);
          break;
        }
      }
      this.setDeckForParty(data.data);
      this.setMain(data.data);
      var save = this.clearOneUserForEmit(this.listUser[data.data.username]);
      var user = Object.assign({},this.listUser[data.data.username])
      this.reloadOneUserData(this.listUser[data.data.username],save);
      socket.emit('actualizUser',{data: user})
      this.getMyListCard(socket,data);
    }

    getMyListCard(socket,data){
      var listCard = {};
      var page = 0;
      for (var card in this.listUser[data.data.username].cards) {
        var nope = 0;
        if(parseInt(data.data.race) !== 0){
          if(data.data.race !== this.listUser[data.data.username].cards[card].race)
            nope = 1;
        }
        if(parseInt(data.data.point) > 0 && parseInt(data.data.point) < 10){
          if(parseInt(data.data.point) !== parseInt(this.listUser[data.data.username].cards[card].point))
            nope = 1;
        }
        if(parseInt(data.data.point) == 10 && parseInt(this.listUser[data.data.username].cards[card].point) < 10)
          nope = 1;
        if(parseInt(data.data.cost) !== 0 && parseInt(this.listUser[data.data.username].cards[card].cost) < parseInt(data.data.cost))
          nope = 1
        
        if(nope === 0){
          page += 0.2;
          if(Math.ceil(page) == data.data.page)
            listCard[card] = this.listUser[data.data.username].cards[card];
        }
      }
      socket.emit('getMyListCard', { listCard: listCard ,nbr : Math.ceil(page),race:data.data.race,point:data.data.point,page:data.data.page,cost:data.data.cost,});
    }

    getUser(username){
      if(this.listUser[username]){
        return this.listUser[username];
      }
    }

    connectUser(socket,data){
      if(this.listUser[data.user.username]){
        this.listUser[data.user.username].socket = socket;

        var save = this.clearOneUserForEmit(this.listUser[data.user.username]);
        var user = Object.assign({},this.listUser[data.user.username])
        this.reloadOneUserData(this.listUser[data.user.username],save);
        data = {
          user: user,
          listCardImg: this.listCardImg,
        }
        socket.emit('createOk', { data: data });
        //jwt.sign({ user: req.body.user.username ,iat:Date.now() }, this.signed)
        return this.listUser[data.user.username];
      }
    }

    createUser(socket,data){
      if(!this.listUser[data.user.username]){
        this.listUser[data.user.username] = data.user;
        this.listUser[data.user.username].name = data.user.username;
        this.listUser[data.user.username].cards=this.firstDeck.createFirstDeck(data.user.username)//this.firstDeck.createFirstDeck(data.user.username);
        this.listUser[data.user.username].socket = socket;
        this.listUser[data.user.username].monaie = 100;
        this.setDeckForParty(data.user);
        this.setMain(data.user);
        
        var save = this.clearOneUserForEmit(this.listUser[data.user.username]);
        var user = Object.assign({},this.listUser[data.user.username])
        this.reloadOneUserData(this.listUser[data.user.username],save);

        data = {
          user: user,
          listCardImg: this.listCardImg,
        }
        socket.emit('createOk', { data: data });
        //jwt.sign({ user: req.body.user.username ,iat:Date.now() }, this.signed)
        return this.listUser[data.user.username];
      }
    }

}

module.exports = Gaia;

