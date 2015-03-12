var ga = require('../ga.js');

describe("Genetic Algorithm Tests", function() {
    it('should perform pmx crossover correctly on an 8-city path', function() {
        var p1 = [0, 1, 2, 3, 4, 5, 6, 7];
        var p2 = [0, 3, 4, 5, 6, 7, 1, 2];
        var offspring = ga.pmx(p1, p2, 3, 6);
        expect(offspring[0]).toEqual([0, 1, 2, 5, 6, 7, 4, 3]);
        expect(offspring[1]).toEqual([0, 7, 6, 3, 4, 5, 1, 2]);

        offspring = ga.pmx(p1, p2, 5, 8);
        expect(offspring[0]).toEqual([0, 6, 5, 3, 4, 7, 1, 2]);
        expect(offspring[1]).toEqual([0, 3, 4, 2, 1, 5, 6, 7]);

        offspring = ga.pmx(p1, p2, 1, 4);
        expect(offspring[0]).toEqual([0, 3, 4, 5, 2, 1, 6, 7]);
        expect(offspring[1]).toEqual([0, 1, 2, 3, 6, 7, 5, 4]);
    });

    it ('should perform pmx crossover correctly on a 10-city path', function() {
        var p1 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        var p2 = [0, 9, 3, 7, 8, 2, 6, 5, 1, 4];
        var offspring = ga.pmx(p1, p2, 3, 7);
        expect(offspring[0]).toEqual([0, 1, 5, 7, 8, 2, 6, 3, 4, 9]);
        expect(offspring[1]).toEqual([0, 9, 7, 3, 4, 5, 6, 2, 1, 8]);

        var offspring = ga.pmx(p1, p2, 3, 9);
        expect(offspring[0]).toEqual([0, 4, 3, 7, 8, 2, 6, 5, 1, 9]);
        expect(offspring[1]).toEqual([0, 9, 2, 3, 4, 5, 6, 7, 8, 1]);
    });
});