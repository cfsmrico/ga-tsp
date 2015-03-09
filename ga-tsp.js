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

// partially mapped crossover
exports.pmx = function(p1, p2) {
    var offspring = [];
    offspring[0] = p1.slice(0);
    offspring[1] = p2.slice(0);
    var cut1 = Math.floor(Math.random() * p1.length);   // left side of crossover section
    var cut2 = cut1 + 1 + Math.floor(Math.random() * (p1.length - cut1));   // right side of crossover section
    var mapping = [];

    // create a mapping of swapped cities while swapping cities in crossover section
    for (var i = cut1; i < cut2; ++i) {
        mapping[p1[i]] = p2[i];
        mapping[p2[i]] = p1[i];
        swapCityTwoPaths(offspring[0], offspring[1], i);
    }

    // repair duplicates in offspring using mapping of swapped cities (before crossover section)
    for (var i = 0; i < cut1; ++i) {
        if (mapping[p1[i]] !== undefined) {
            offspring[0][i] = mapping[p1[i]];
        }
        if (mapping[p2[i]] !== undefined) {
            offspring[1][i] = mapping[p2[i]];
        }
    }

    // repair duplicates in offspring using mapping of swapped cities (after crossover section)
    for (var i = cut2; i < p1.length; ++i) {
        if (mapping[p1[i]] !== undefined) {
            offspring[0][i] = mapping[p1[i]];
        }
        if (mapping[p2[i]] !== undefined) {
            offspring[1][i] = mapping[p2[i]];
        }
    }    

    return offspring;
};

// randomly pick and return two indices i, j from path p (i < j)
var pickTwoIndices = function(p) {
    var i = Math.floor(Math.random() * p.length);
    var j = i;

    while (i == j) {
        j = Math.floor(Math.random() * p.length);
    }

    return i < j ? [i, j] : [j, i];
};

// random city swap mutation
exports.randomCitySwapMutation = function(p) {
    var c = p.slice(0);
    var twoIndices = pickTwoIndices(p);
    swapCityOnePath(c, twoIndices[0], twoIndices[1]);
    return c;
};

// reverse sequence mutation
exports.rsm = function(p) {
    var c = p.slice(0);
    var twoIndices = pickTwoIndices(p);

    // reverse sequence of cities between p[i] and p[j]
    for (var i = twoIndices[0], j = twoIndices[1]; i < j; ++i, --j) {
        swapCityOnePath(c, i, j);
    }

    return c;
};
