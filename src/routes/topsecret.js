const { Router } = require("express");
const router = Router();

class Satellite{
    constructor(x, y, message){
        this.x = x;
        this.y = y;
        this.message = message;
    }

    getLocation(distance){
        let x = distance.x - this.x;
        let y = distance.y - this.y;
        x < 0 ? distance.x = x*-1 : distance.x = x ;
        y < 0 ? distance.y = y*-1 : distance.y = y ;
        return  distance;
    }

}

//Posición de los satélites actualmente en servicio
const kenobi = new Satellite(-500,-200);
const skywalker = new Satellite(-500,-200);
const sato = new Satellite(-500,-200);


//Routes
router.post('/topsecret/', (req,res) =>{
    const { satellites } = req.body
    kenobi.message = satellites[0].message;
    skywalker.message = satellites[1].message;
    sato.message = satellites[2].message;
    let satellitesObj = [kenobi, skywalker, sato];
    var messageDecoded = GetMessage(satellitesObj)
    const response = {
        position: "idk",
        message: messageDecoded
    }
    res.json(response)
})

router.get('/topsecret/', (req,res) =>{
   

    res.json()
})


//Functions
function GetMessage(satellites) {
    var messageDecoded = [];
    var lenghtMessage = 0;
    while (satellites[0].message.length > lenghtMessage ) {
        satellites.forEach(satellite => {
            var cont = 0;
            for (let i = 0; i < satellite.message.length; i++) {
                if(satellite.message[i] != "" && messageDecoded.indexOf(satellite.message[i] ) < 0 && cont == 0){
                    messageDecoded.push(satellite.message[i]);
                    lenghtMessage++;
                    cont++;
                }
            }
        });
    }
    return messageDecoded;
}

module.exports = router