var jwt = require('jsonwebtoken');
var timeExpiration = 60000*60
var fs = require('fs');


//ownerVerified = jwt.verify(req.body.vin.owner, 'shhhhhh');
class User {

    constructor(signed){
        this.signed = signed;
    }

    createUser(req,res){
        jwt.sign({ user: req.body.user.username ,iat:Date.now() }, this.signed)
    }

}

module.exports = User;

