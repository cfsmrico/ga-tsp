// swap cities between two paths at the index position
var swapCityTwoPaths = function(p1, p2, index) {
    var temp = p1[index];
    p1[index] = p2[index];
    p2[index] = temp;
};

// swap p[i] with p[j]
var swapCityOnePath = function(p, i, j) {
    var temp = p[i];
    p[i] = p[j];
    p[j] = temp;
};

// randomly pick and return two indices i, j from path p (i < j) and i != 0
var pickTwoIndices = function(p) {
    var i = Math.floor(1 + Math.random() * (p.length - 1));
    var j = i;

    while (i == j) {
        j = Math.floor(1 + Math.random() * (p.length - 1));
    }

    return i < j ? [i, j] : [j, i];
};

// swap a random pair of cities and return path
exports.citySwapMutation = function(p) {
    var c = p.slice(0);
    var twoIndices = pickTwoIndices(p);
    swapCityOnePath(c, twoIndices[0], twoIndices[1]);
    return c;
};

// reverse a random sub-sequence p[i], p[i + 1], p[i + 2] ... with p[i + 2], p[i + 1], p[i]
exports.rsm = exports.randomSequenceMutation = function(p) {
    var c = p.slice(0);
    var twoIndices = pickTwoIndices(p);

    // reverse sequence of cities between p[i] and p[j]
    for (var i = twoIndices[0], j = twoIndices[1]; i < j; ++i, --j) {
        swapCityOnePath(c, i, j);
    }

    return c;
};

// partially mapped crossover
exports.pmx = exports.partiallyMappedCrossover = exports.partiallyMatchedCrossover = function(p1, p2, cut1, cut2) {
    var offspring = [p1.slice(0), p2.slice(0)];
    var cut1 = cut1 !== undefined ? cut1 : 1 + Math.floor(Math.random() * (p1.length - 1));   // left side of crossover section
    var cut2 = cut2 !== undefined ? cut2 : cut1 + 1 + Math.floor(Math.random() * (p1.length - cut1));   // right side of crossover section
    var mapping1 = [];
    var mapping2 = [];

    // create a mapping of swapped cities while swapping cities in crossover section
    for (var i = cut1; i < cut2; ++i) {
        mapping2[p1[i]] = p2[i];
        mapping1[p2[i]] = p1[i];
        swapCityTwoPaths(offspring[0], offspring[1], i);
    }

    // repair duplicates in offspring using mapping of swapped cities (before crossover section)
    for (var i = 1; i < cut1; ++i) {
        while (mapping1[offspring[0][i]] !== undefined) {
            offspring[0][i] = mapping1[offspring[0][i]];
        }
        while (mapping2[offspring[1][i]] !== undefined) {
            offspring[1][i] = mapping2[offspring[1][i]];
        }
    }

    // repair duplicates in offspring using mapping of swapped cities (after crossover section)
    for (var i = cut2; i < p1.length; ++i) {
        while (mapping1[offspring[0][i]] !== undefined) {
            offspring[0][i] = mapping1[offspring[0][i]];
        }
        while (mapping2[offspring[1][i]] !== undefined) {
            offspring[1][i] = mapping2[offspring[1][i]];
        }
    }    

    return offspring;
};