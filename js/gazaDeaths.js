// https://github.com/kaepora/gazaDeaths
var gazaDeaths = {}
var ageChart = null
var genderChart = null

$.getJSON('parsed.json', function(response) {

'use strict';
gazaDeaths.data = response


$(window).resize(draw)
$(document).ready(draw)


// List
;(function() {
    $('span.deadCount').text(Object.keys(gazaDeaths.data).length)
    for (var i in gazaDeaths.data) {
        if (gazaDeaths.data.hasOwnProperty(i)) {
            var personType = ''
            var personColor = ''
            var personFontColor = '#FFFFFF'
            if (gazaDeaths.data[i].gender === 'male') {
                if (
                    gazaDeaths.data[i].age
                    && gazaDeaths.data[i].age < 21
                ) {
                    personType  = 'boy'
                    personColor = '#ABDCD6'
                    personFontColor = '#3B6380'
                }
                else {
                    personType  = 'man'
                    personColor = '#2D5876'
                }
            }
            if (gazaDeaths.data[i].gender === 'female') {
                if (
                    gazaDeaths.data[i].age
                    && gazaDeaths.data[i].age < 21
                ) {
                    personType  = 'girl'
                    personColor = '#E2C6E0'
                    personFontColor = '#815B80'
                }
                else {
                    personType  = 'woman'
                    personColor = '#957494'
                }
            }
            var age = null
            var description
            if (gazaDeaths.data[i].age) {
                age = gazaDeaths.data[i].age
            }

            if (age !== null) {
                description = age + ' year-old ' + personType
            } else {
                description = gazaDeaths.data[i].gender + ' of unknown age'
            }

            $(Mustache.render(gazaDeaths.templates.humanBeing, {
                name: i,
                description: description,
                personColor: personColor,
                personFontColor: personFontColor
            })).appendTo('div.list')

        }
    }
})()

// Gender chart
function drawGenderChart() {
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

    if (genderChart) {
        genderChart.destroy();
    }

    genderChart = new Chart(
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
}

// Age chart (with average age)
function drawAgeChart() {
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

    if (ageChart) {
        ageChart.destroy();
    }

    ageChart = new Chart(
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
}

function setCanvasSize() {
   if (window.innerWidth > 540) {
        $("canvas").each(function() {
            this.width = 300
            this.height = 300
        })
    } else {
        $("canvas").each(function() {
            this.width = 200
            this.height = 200
        })
    }
}

function draw() {
    setCanvasSize()
    drawGenderChart()
    drawAgeChart()
}

})
