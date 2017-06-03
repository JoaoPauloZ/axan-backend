var jwt = require('jsonwebtoken');

var UtilsAxan = {
    createToken: function (idUser, timeExpire) {
        let token = jwt.sign({ data: idUser }, 'shhhhh', { expiresIn: timeExpire });
        return token;
    },
    validateToken : function(token){
        try{
            var decoded = jwt.verify(token, 'shhhhh');
        }catch(err){
            return undefined;
        }
        return decoded.data;
    }
        
}

module.exports = UtilsAxan;