// https://twitter.com/nntaleb/status/488373148283600896
'use strict';
var fs = require('fs')

var gazaDeaths = {}

gazaDeaths.getJSON = function(filename) {
    var data = {}
    var dead = fs.readFileSync(filename, 'utf8')
    dead = dead.split('\n')
    for (var l = 0; l < dead.length; l++) {
        if (dead[l].length === 0) {
            dead.splice(l, 1)
        }
    }
    for (var l = 0; l < dead.length; l++) {
        var humanBeing = {
            name: '',
            age: null,
            gender: null,
            killingLocation: null 
        }
        humanBeing.name = dead[l].match(/((\w|\-)+\s){1,4}(\w|\-)+/)[0]
        humanBeing.age  = dead[l].match(/\s\d{1,3}/)
        humanBeing.killingLocation = dead[l].match(/killed in ([A-Za-z \-]+)/) || dead[l].match(/ ([A-Z][A-Za-z \-]+)(\.|$)/)
        if (humanBeing.age) {
            humanBeing.age = humanBeing.age[0].substring(1)
        }
        if (dead[l].match(/female/i)) {
            humanBeing.gender = 'female'
        }
        else {
            humanBeing.gender = 'male'
        }
        if (humanBeing.killingLocation) {
            humanBeing.killingLocation = humanBeing.killingLocation[1]
        }

        data[humanBeing.name] = {
            age: humanBeing.age,
            gender: humanBeing.gender,
            killingLocation: humanBeing.killingLocation
        }
    }
    return data
}

gazaDeaths.writeToFile = function(data, filename) {
    fs.writeFileSync(filename, data)
}

gazaDeaths.writeToFile(
    JSON.stringify(gazaDeaths.getJSON('data.txt')),
    'gazaDeaths.json'
)
