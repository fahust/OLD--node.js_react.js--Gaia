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

    firstCreateCard(){
      var img = fs.readFileSync(__dirname + '/tmp/uploads/test.png', function read(err, data) {
        if (err) {
            console.log(err)
            return err
        }
        return data;
      });
      var listCard = {
        dalkar_soldier:{name:'Dalkar Soldier',point:2,cost:2,race:'Human',img:img ,skill:{type:0}},
        dalkar_archer:{name:'Dalkar Archer',point:2,cost:2,race:'Human',img:img ,skill:{type:0}},
        dalkar_brawler:{name:'Dalkar Brawler',point:1,cost:1,race:'Human',img:img ,skill:{type:0}},
        dalkar_pikeman:{name:'Dalkar Pikeman',point:3,cost:3,race:'Human',img:img ,skill:{type:0}},
        dalkar_balista:{name:'Dalkar Balista',point:5,cost:5,race:'Human',img:img ,skill:{type:0}},
        dalkar_assassin:{name:'Dalkar Assassin',point:4,cost:4,race:'Human',img:img ,skill:{type:0}},
        dalkar_crossbowman:{name:'Dalkar Crossbowman',point:2,cost:2,race:'Human',img:img ,skill:{type:0}},
        dalkar_prince:{name:'Dalkar Prince',point:6,cost:6,race:'Human',img:img ,skill:{type:0}},
        dalkar_queen:{name:'Dalkar Queen',point:5,cost:5,race:'Human',img:img ,skill:{type:0}},
        dalkar_king:{name:'Dalkar King',point:7,cost:7,race:'Human',img:img ,skill:{type:0}},
        
        kalarun:{name:'Kalarun',point:5,cost:5,race:'Monster',img:img ,skill:{type:0}},
        Harpy:{name:'Harpy',point:3,cost:3,race:'Monster',img:img ,skill:{type:0}},
        ghoul:{name:'Ghoul',point:2,cost:2,race:'Monster',img:img ,skill:{type:0}},
        spectrum:{name:'Spectrum',point:2,cost:2,race:'Monster',img:img ,skill:{type:0}},
        mutant:{name:'Mutant',point:3,cost:3,race:'Monster',img:img ,skill:{type:0}},
        gnome:{name:'Gnome',point:2,cost:2,race:'Monster',img:img ,skill:{type:0}},
        orc:{name:'Orc',point:4,cost:4,race:'Monster',img:img ,skill:{type:0}},
        griffon:{name:'Griffon',point:7,cost:7,race:'Monster',img:img ,skill:{type:0}},
        golem:{name:'Golem',point:6,cost:6,race:'Monster',img:img ,skill:{type:0}},
        leprechaun:{name:'Leprechaun',point:1,cost:1,race:'Monster',img:img ,skill:{type:0}},
        undead:{name:'Undead',point:2,cost:2,race:'Monster',img:img ,skill:{type:0}},

        erod_archer:{name:'Erod Archer',point:2,cost:2,race:'Elf',img:img ,skill:{type:0}},
        erod_prietress:{name:'Erod Prietress',point:4,cost:4,race:'Elf',img:img ,skill:{type:0}},
        erod_shaman:{name:'Erod Shaman',point:3,cost:3,race:'Elf',img:img ,skill:{type:0}},
        erod_princess:{name:'Erod Princess',point:5,cost:5,race:'Elf',img:img ,skill:{type:0}},
        high_elf:{name:'High Elf',point:6,cost:6,race:'Elf',img:img ,skill:{type:0}},
        night_elf:{name:'Night Elf',point:4,cost:4,race:'Elf',img:img ,skill:{type:0}},

        kaleb_alchemist:{name:'Kaleb Alchemist',point:1,cost:1,race:'Mage',img:img ,skill:{type:0}},
        kaleb_wizard:{name:'Kaleb Wizard',point:2,cost:2,race:'Mage',img:img ,skill:{type:0}},
        kaleb_shapeshifter:{name:'Kaleb Shapeshifter',point:4,cost:4,race:'Mage',img:img ,skill:{type:0}},
        kaleb_pyromancer:{name:'Kaleb Pyromancer',point:3,cost:3,race:'Mage',img:img ,skill:{type:0}},
        kaleb_necromancer:{name:'Kaleb Necromancer',point:3,cost:3,race:'Mage',img:img ,skill:{type:0}},
        kaleb_illusionist:{name:'Kaleb Illusionist',point:2,cost:2,race:'Mage',img:img ,skill:{type:0}},
        kaleb_draconist:{name:'Kaleb Draconist',point:5,cost:5,race:'Mage',img:img ,skill:{type:0}},
        kaleb_elementalist:{name:'Kaleb Elementalist',point:6,cost:6,race:'Mage',img:img ,skill:{type:0}},

        baleihm_gunner:{name:'Baleihm Gunner',point:3,cost:3,race:'Dwarf',img:img ,skill:{type:0}},
        baleihm_warrior:{name:'Baleihm Warrior',point:2,cost:2,race:'Dwarf',img:img ,skill:{type:0}},
        baleihm_technician:{name:'Baleihm Technician',point:1,cost:1,race:'Dwarf',img:img ,skill:{type:0}},
        baleihm_kingsguard:{name:'Baleihm Kingsguard',point:4,cost:4,race:'Dwarf',img:img ,skill:{type:0}},
        baleihm_king:{name:'Baleihm King',point:5,cost:5,race:'Dwarf',img:img ,skill:{type:0}},
      }
      return listCard;
    }

    createFirstDeck(username){
      var listCards = [];
      for (let index = 0; index <= 50; index++) {
        var card = this.getAleatCard();
        listCards.push(card);
      }
      return listCards;
    }

}

module.exports = FirstDeck;

