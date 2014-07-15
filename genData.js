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
            grantedDignity: false
        }
        humanBeing.name = dead[l].match(/((\w|\-)+\s){2,5}/)[0]
        humanBeing.age  = dead[l].match(/\(\d{1,3}\)/)
        if (humanBeing.age) {
            humanBeing.age = humanBeing.age[0].substring(
                1, humanBeing.age[0].length - 1
            )
        }
        if (dead[l].match(/female/i)) {
            humanBeing.gender = 'female'
        }
        else {
            humanBeing.gender = 'male'
        }
        data[humanBeing.name] = {
            age: humanBeing.age,
            gender: humanBeing.gender,
            grantedDignity: humanBeing.grantedDignity
        }
    }
    return data
}

gazaDeaths.writeToFile = function(data, filename) {
    fs.writeFileSync(filename, data)
}

gazaDeaths.writeToFile(
    JSON.stringify(gazaDeaths.getJSON('data.txt')),
    'parsed.json'
)
