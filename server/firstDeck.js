var jwt = require('jsonwebtoken');
var timeExpiration = 60000*60
var fs = require('fs');

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }


//ownerVerified = jwt.verify(req.body.vin.owner, 'shhhhhh');
class FirstDeck {

    constructor(getAleatCard){
      this.getAleatCard = getAleatCard;
    }

    getFirstDeck(){
      var listCard = {
        dalkar_soldier:{slug:'dalkar_soldier',name:'Dalkar Soldier',point:2,cost:4,race:'Human',invulnerable:0 ,skillMelee:{type:2,nbr:1,ligne:1,val:'Impose 1 damage to an opposing random target',},skillDist:{type:1,nbr:1,ligne:1,val:'',},},
        dalkar_archer:{slug:'dalkar_archer',name:'Dalkar Archer',point:2,cost:4,race:'Human',invulnerable:0 ,skillMelee:{type:1,nbr:1,ligne:1,val:'',},skillDist:{type:2,nbr:1,ligne:1,val:'Impose 1 damage to an opposing random target',},},
        dalkar_brawler:{slug:'dalkar_brawler',name:'Dalkar Brawler',point:1,cost:4,race:'Human',invulnerable:0 ,skillMelee:{type:2,nbr:2,ligne:1,val:'Impose 2 damage to an opposing random target',},skillDist:{type:1,nbr:1,ligne:1,val:'',},},
        dalkar_pikeman:{slug:'dalkar_pikeman',name:'Dalkar Pikeman',point:3,cost:12,race:'Human',invulnerable:0 ,skillMelee:{type:1,nbr:1,ligne:1,val:'',},skillDist:{type:2,nbr:2,ligne:1,val:'Impose 2 damage to an opposing random target',},},
        dalkar_balista:{slug:'dalkar_balista',name:'Dalkar Balista',point:5,cost:40,race:'Human',invulnerable:0 ,skillMelee:{type:1,nbr:1,ligne:1,val:'',},skillDist:{type:2,nbr:4,ligne:1,val:'Impose 4 damage to an opposing random target',},},
        dalkar_assassin:{slug:'dalkar_assassin',name:'Dalkar Assassin',point:1,cost:49,race:'Human',invulnerable:0 ,skillMelee:{type:7,nbr:7,ligne:1,val:'Destroy all enemy cards that have 7 point',},skillDist:{type:1,nbr:1,ligne:1,val:'',},},
        dalkar_crossbowman:{slug:'dalkar_crossbowman',name:'Dalkar Crossbowman',point:2,cost:56,race:'Human',invulnerable:0 ,skillMelee:{type:1,nbr:1,ligne:1,val:'',},skillDist:{type:7,nbr:4,ligne:1,val:'Destroy all enemy cards that have 4 point',},},
        dalkar_prince:{slug:'dalkar_prince',name:'Dalkar Prince',point:6,cost:36,race:'Human',invulnerable:0 ,skillMelee:{type:3,nbr:1,ligne:2,val:'Giving 1 point to the same allied race',},skillDist:{type:1,nbr:1,ligne:1,val:'',},},
        dalkar_queen:{slug:'dalkar_queen',name:'Dalkar Queen',point:5,cost:25,race:'Human',invulnerable:0 ,skillMelee:{type:5,nbr:1,ligne:1,val:'Add 1 point on this card per same allied race put into table',},skillDist:{type:1,nbr:1,ligne:1,val:'',},},
        dalkar_king:{slug:'dalkar_king',name:'Dalkar King',point:7,cost:28,race:'Human',invulnerable:0 ,skillMelee:{type:2,nbr:1,ligne:2,val:'Impose 1 damage to the same race',},skillDist:{type:1,nbr:1,ligne:1,val:'',},},
        
        kalarun:{slug:'kalarun',name:'Kalarun',point:5,cost:40,race:'Monster',invulnerable:0 ,skillMelee:{type:2,nbr:5,ligne:1,val:'Impose 4 damage to an opposing random target',},skillDist:{type:1,nbr:1,ligne:1,val:'',},},
        harpy:{slug:'harpy',name:'Harpy',point:3,cost:24,race:'Monster',invulnerable:0 ,skillMelee:{type:1,nbr:1,ligne:1,val:'',},skillDist:{type:2,nbr:1,ligne:4,val:'Impose 1 damage to the line of melee',},},
        ghoul:{slug:'ghoul',name:'Ghoul',point:2,cost:36,race:'Monster',invulnerable:0 ,skillMelee:{type:6,nbr:3,ligne:1,val:'Confers invulnerability to random target for 3 number of turns',},skillDist:{type:1,nbr:1,ligne:1,val:'',},},
        spectrum:{slug:'spectrum',name:'Spectrum',point:2,cost:48,race:'Monster',invulnerable:0 ,skillMelee:{type:1,nbr:1,ligne:1,val:'',},skillDist:{type:6,nbr:2,ligne:2,val:'Confers invulnerability to the same race for 2 number of turns',},},
        mutant:{slug:'mutant',name:'Mutant',point:3,cost:6,race:'Monster',invulnerable:0 ,skillMelee:{type:2,nbr:1,ligne:1,val:'Impose 1 damage to an opposing random target',},skillDist:{type:1,nbr:1,ligne:1,val:'',},},
        gnome:{slug:'gnome',name:'Gnome',point:2,cost:2,race:'Monster',invulnerable:0 ,skillMelee:{type:1,nbr:1,ligne:1,val:'',},skillDist:{type:1,nbr:1,ligne:1,val:'',},},
        orc:{slug:'orc',name:'Orc',point:4,cost:48,race:'Monster',invulnerable:0 ,skillMelee:{type:2,nbr:5,ligne:1,val:'Impose 6 damage to an opposing random target',},skillDist:{type:1,nbr:1,ligne:1,val:'',},},
        griffon:{slug:'griffon',name:'Griffon',point:5,cost:320,race:'Monster',invulnerable:0 ,skillMelee:{type:2,nbr:1,ligne:4,val:'Impose 1 damage to the line of melee',},skillDist:{type:8,nbr:1,ligne:1,val:'Invulnerability',},},
        golem:{slug:'golem',name:'Golem',point:12,cost:12,race:'Monster',invulnerable:0 ,skillMelee:{type:1,nbr:1,ligne:1,val:'',},skillDist:{type:1,nbr:1,ligne:1,val:'',},},
        leprechaun:{slug:'leprechaun',name:'Leprechaun',point:1,cost:108,race:'Monster',invulnerable:0 ,skillMelee:{type:3,nbr:1,ligne:4,val:'Giving 1 point to the line of melee',},skillDist:{type:3,nbr:1,ligne:3,val:'Giving 1 point to the line of distance',},},
        undead:{slug:'undead',name:'Undead',point:1,cost:8,race:'Monster',invulnerable:0 ,skillMelee:{type:8,nbr:1,ligne:1,val:'Invulnerability',},skillDist:{type:1,nbr:1,ligne:1,val:'',},},

        erod_archer:{slug:'erod_archer',name:'Erod Archer',point:2,cost:2,race:'Elf',invulnerable:0 ,skillMelee:{type:1,nbr:1,ligne:1,val:'',},skillDist:{type:2,nbr:2,ligne:1,val:'Impose 2 damage to an opposing random target',},},
        erod_prietress:{slug:'erod_prietress',name:'Erod Prietress',point:4,cost:4,race:'Elf',invulnerable:0 ,skillMelee:{type:1,nbr:1,ligne:1,val:'',},skillDist:{type:3,nbr:1,ligne:3,val:'Giving 1 point to the line of distance',},},
        erod_shaman:{slug:'erod_shaman',name:'Erod Shaman',point:3,cost:3,race:'Elf',invulnerable:0 ,skillMelee:{type:3,nbr:2,ligne:3,val:'Giving 2 point to the line of distance',},skillDist:{type:2,nbr:2,ligne:4,val:'Impose 2 damage to the line of melee',},},
        erod_princess:{slug:'erod_princess',name:'Erod Princess',point:1,cost:1,race:'Elf',invulnerable:0 ,skillMelee:{type:5,nbr:2,ligne:1,val:'Add 2 point on this card per same allied race put into table',},skillDist:{type:1,nbr:1,ligne:1,val:'',},},
        high_elf:{slug:'high_elf',name:'High Elf',point:6,cost:6,race:'Elf',invulnerable:0 ,skillMelee:{type:8,nbr:1,ligne:1,val:'Invulnerability',},skillDist:{type:1,nbr:1,ligne:1,val:'',},},
        night_elf:{slug:'night_elf',name:'Night Elf',point:4,cost:4,race:'Elf',invulnerable:0 ,skillMelee:{type:1,nbr:1,ligne:1,val:'',},skillDist:{type:2,nbr:1,ligne:2,val:'Impose 1 damage to the same race',},},

        kaleb_alchemist:{slug:'kaleb_alchemist',name:'Kaleb Alchemist',point:1,cost:3,race:'Mage',invulnerable:0 ,skillMelee:{type:1,nbr:1,ligne:1,val:'',},skillDist:{type:3,nbr:1,ligne:3,val:'Giving 1 point to the line of distance',},},
        kaleb_wizard:{slug:'kaleb_wizard',name:'Kaleb Wizard',point:2,cost:8,race:'Mage',invulnerable:0 ,skillMelee:{type:1,nbr:1,ligne:1,val:'',},skillDist:{type:2,nbr:2,ligne:1,val:'Impose 2 damage to an opposing random target',},},
        kaleb_shapeshifter:{slug:'kaleb_shapeshifter',name:'Kaleb Shapeshifter',point:4,cost:32,race:'Mage',invulnerable:0 ,skillMelee:{type:1,nbr:1,ligne:1,val:'',},skillDist:{type:8,nbr:1,ligne:1,val:'Invulnerability',},},
        kaleb_pyromancer:{slug:'kaleb_pyromancer',name:'Kaleb Pyromancer',point:3,cost:105,race:'Mage',invulnerable:0 ,skillMelee:{type:1,nbr:1,ligne:1,val:'',},skillDist:{type:5,nbr:5,ligne:1,val:'Destroy all enemy cards that have 5 point',},},
        kaleb_necromancer:{slug:'kaleb_necromancer',name:'Kaleb Necromancer',point:3,cost:15,race:'Mage',invulnerable:0 ,skillMelee:{type:1,nbr:1,ligne:1,val:'',},skillDist:{type:5,nbr:1,ligne:1,val:'Add 1 point on this card per same allied race put into table',},},
        kaleb_illusionist:{slug:'kaleb_illusionist',name:'Kaleb Illusionist',point:2,cost:24,race:'Mage',invulnerable:0 ,skillMelee:{type:1,nbr:1,ligne:1,val:'',},skillDist:{type:3,nbr:2,ligne:2,val:'Giving 2 point to the same allied race'},},
        kaleb_draconist:{slug:'kaleb_draconist',name:'Kaleb Draconist',point:5,cost:120,race:'Mage',invulnerable:0 ,skillMelee:{type:1,nbr:1,ligne:1,val:'',},skillDist:{type:2,nbr:3,ligne:4,val:'Impose 3 damage to the line of melee',},},
        kaleb_elementalist:{slug:'kaleb_elementalist',name:'Kaleb Elementalist',point:6,cost:144,race:'Mage',invulnerable:0 ,skillMelee:{type:2,nbr:1,ligne:2,val:'Impose 1 damage to the same allied race',},skillDist:{type:3,nbr:1,ligne:2,val:'Giving 1 point to the same allied race'},},

        baleihm_gunner:{slug:'baleihm_gunner',name:'Baleihm Gunner',point:3,cost:24,race:'Dwarf',invulnerable:0 ,skillMelee:{type:1,nbr:1,ligne:1,val:'',},skillDist:{type:2,nbr:1,ligne:4,val:'Impose 1 damage to at the line of melee',},},
        baleihm_warrior:{slug:'baleihm_warrior',name:'Baleihm Warrior',point:2,cost:12,race:'Dwarf',invulnerable:0 ,skillMelee:{type:2,nbr:3,ligne:1,val:'Impose 3 damage to an opposing random target',},skillDist:{type:1,nbr:1,ligne:1,val:'',},},
        baleihm_technician:{slug:'baleihm_technician',name:'Baleihm Technician',point:1,cost:18,race:'Dwarf',invulnerable:0 ,skillMelee:{type:3,nbr:2,ligne:3,val:'Giving 2 point to the line of distance',},skillDist:{type:1,nbr:1,ligne:1,val:'',},},
        baleihm_kingsguard:{slug:'baleihm_kingsguard',name:'Baleihm Kingsguard',point:4,cost:64,race:'Dwarf',invulnerable:0 ,skillMelee:{type:2,nbr:2,ligne:4,val:'Impose 2 damage to the line of melee',},skillDist:{type:1,nbr:1,ligne:1,val:'',},},
        baleihm_king:{slug:'baleihm_king',name:'Baleihm King',point:5,cost:90,race:'Dwarf',invulnerable:0 ,skillMelee:{type:3,nbr:3,ligne:2,val:'Giving 3 point to the same allied race',},skillDist:{type:1,nbr:1,ligne:1,val:'',},},
      }
      return listCard;
    }

    firstCreateCard(){
      /*var img = fs.readFileSync(__dirname + '/tmp/uploads/dalkar_soldier.png', function read(err, data) {
        if (err) {
            console.log(err)
            return err
        }
        return data;
      });*/
      var listCard = this.getFirstDeck();
      var listCardImg = {};
      for (const [key, value] of Object.entries(listCard)) {
          try {
            var img = fs.readFileSync(__dirname + '/tmp/uploads/'+key+'.png', function read(err, data) {
              if (err) {
                  console.log(err)
                  return err
              }
              return data;
            });
            listCardImg[key] = img;
          }catch(err){
            
          }
        
      }
      var cards = {
        listCard:listCard,
        listCardImg:listCardImg,
      }

      return cards;
    }

    createFirstDeck(username){
      var listCards = [];
      var listCard = this.getFirstDeck();
      Object.keys(listCard).forEach(card => {
        var card = Object.assign({},listCard[card]);
        card.owner = username;
        listCards.push(card);
      });
      /*for (let index = 0; index <= 50; index++) {
        var card = this.getAleatCard();
        card = Object.assign({},card);
        card.owner = username;
        listCards.push(card);
      }*/
      return listCards;
    }

}

module.exports = FirstDeck;

