// https://github.com/kaepora/gazaDeaths
var gazaDeaths = {}

$.get('parsed.json', function(response) {

'use strict';
gazaDeaths.data = response

// List
;(function() {
    $('span.deadCount').text(Object.keys(gazaDeaths.data).length)
    for (var i in gazaDeaths.data) {
        if (gazaDeaths.data.hasOwnProperty(i)) {
            var personType = ''
            var personColor = ''
            if (gazaDeaths.data[i].gender === 'male') {
                if (
                    gazaDeaths.data[i].age
                    && gazaDeaths.data[i].age < 21
                ) {
                    personType  = 'Young boy'
                    personColor = '#ABDCD6'
                }
                else {
                    personType  = 'Man'
                    personColor = '#2D5876'
                }
            }
            if (gazaDeaths.data[i].gender === 'female') {
                if (
                    gazaDeaths.data[i].age
                    && gazaDeaths.data[i].age < 21
                ) {
                    personType  = 'Young girl'
                    personColor = '#E2C6E0'
                }
                else {
                    personType  = 'Woman'
                    personColor = '#957494'
                }
            }
            var age = 'Unknown'
            if (gazaDeaths.data[i].age) {
                age = gazaDeaths.data[i].age
            }
            $(Mustache.render(gazaDeaths.templates.humanBeing, {
                name: i,
                type: personType,
                age: age,
                personColor: personColor
            })).appendTo('div.list')

        }
    }
})()

// Gender chart
;(function() {
    var genderCount = {
        male: 0,
        female: 0,
        unconfirmed: 0
    }
    for (var i in gazaDeaths.data) {
        if (gazaDeaths.data.hasOwnProperty(i)) {
            if (gazaDeaths.data[i].gender === 'male') {
                genderCount.male++
            }
            else if (gazaDeaths.data[i].gender === 'female') {
                genderCount.female++
            }
            else {
                genderCount.unconfirmed++
            }
        }
    }
    var genderChart = new Chart(
        $('div.genderChart canvas').get(0).getContext('2d')
    ).Pie(
        [
            {
                value: genderCount.male,
                color:'#ABDCD6',
                highlight: '#ABDCD6',
                label: 'Male'
            },
            {
                value: genderCount.female,
                color: '#FF6165',
                highlight: '#FF6165',
                label: 'Female'
            },
            {
                value: genderCount.unconfirmed,
                color: '#333333',
                highlight: '#333333',
                label: 'Unconfirmed'
            }
        ], {
            animation: false
        }
    )
})()

// Age chart (with average age)
;(function() {
    var ratio = {
        children: 0,
        adults: 0,
        unknown: 0
    }
    for (var i in gazaDeaths.data) {
        if (gazaDeaths.data.hasOwnProperty(i)) {
            if (!gazaDeaths.data[i].age) {
                ratio.unknown++
            }
            else if (gazaDeaths.data[i].age >= 21) {
                ratio.adults++
            }
            else if (gazaDeaths.data[i].age < 21) {
                ratio.children++
            }
        }
    }
    var genderChart = new Chart(
        $('div.childrenChart canvas').get(0).getContext('2d')
    ).Pie(
        [
            {
                value: ratio.children,
                color:'#ABDCD6',
                highlight: '#ABDCD6',
                label: 'Children'
            },
            {
                value: ratio.adults,
                color: '#FF6165',
                highlight: '#FF6165',
                label: 'Adults'
            },
            {
                value: ratio.unknown,
                color: '#333333',
                highlight: '#333333',
                label: 'Unknown'
            }
        ], {
            animation: false
        }
    )
})()


})
