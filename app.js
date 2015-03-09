var City = require('./City.js');
var Tour = require('./Tour.js');
var crossoverMutation = require('./crossover-mutation.js');
var euclideanDistance = require('euclidean-distance');
var argv = require('minimist')(process.argv.slice(2));

// configurable params
var X_MAX = 1000;
var Y_MAX = 1000;
var nCities = argv.c ? argv.c : 10;
var populationSize = argv.p ? argv.p : 100;
var mutationPct = argv.m ? argv.m : 5;
var isElitist = argv.e ? argv.e : true;
var maxGenerations = argv.g ? argv.g : 10000;
var mutationOperation = argv.o ? argv.o : 1;    // 0 for random city swap and 1 for RSM

var fisherYatesShuffle = function (array) {
    var counter = array.length, temp, index;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
};

// return total distance traveled (higher number == lower fitness)
var calculateDistance = function(tour) {
    var sum = 0.0;

    // aggregate the euclidean distance between all the cities in the tour
    for (var a = 0, b = 1; b < tour.path.length; ++a, ++b) {
        var cityA = cities[tour.path[a]];
        var cityB = cities[tour.path[b]];
        sum += euclideanDistance([cityA.x, cityA.y], [cityB.x, cityB.y]);
    }

    var cityA = cities[tour.path[tour.path.length - 1]];
    var cityB = cities[tour.path[0]];
    sum += euclideanDistance([cityA.x, cityA.y], [cityB.x, cityB.y]);

    return sum;
};

// update distance traveled for all given tours
var updateFitness = function(tours) {
    for (var i = 0; i < tours.length; ++i) {
        tours[i].fitness = calculateDistance(tours[i]);
    }
};

var compareTours = function(f1, f2) {
    if (f1.fitness < f2.fitness) {
        return -1;
    }
    if (f2.fitness < f1.fitness) {
        return 1;
    }
    return 0;
};

// rank tours by fitness (where i is fitter than j when i < j)
var rankTours = function(tours) {
    return tours.sort(compareTours);
};


// create cities
var cities = [];
var cityNames = [];
for (var i = 0; i < nCities; ++i) {
    cities[i] = new City(i, Math.floor(Math.random() * X_MAX), Math.floor(Math.random() * Y_MAX));
    cityNames[i] = i;
}

// init population
var tours = [];
for (var i = 0; i < populationSize; ++i) {
    tours[i] = new Tour(fisherYatesShuffle(cityNames.slice(0), 0.0));
    tours[i].fitness = calculateDistance(tours[i]);
}

var rankedTours = rankTours(tours);
console.log(rankedTours);