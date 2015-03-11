var ga = require('../ga.js');

describe("Genetic Algorithm Tests", function() {
    it('should perform pmx crossover correctly', function() {
        var p1 = [1, 2, 3, 4, 5, 6, 7];
        var p2 = [3, 4, 5, 6, 7, 1, 2];
        var offspring = ga.pmx(p1, p2, 2, 5);
        expect(offspring[0]).toEqual([1, 2, 5, 6, 7, 4, 3]);
        expect(offspring[1]).toEqual([7, 6, 3, 4, 5, 1, 2]);

        offspring = ga.pmx(p1, p2, 4, 7);
        expect(offspring[0]).toEqual([6, 5, 3, 4, 7, 1, 2]);
        expect(offspring[1]).toEqual([3, 4, 2, 1, 5, 6, 7]);

        offspring = ga.pmx(p1, p2, 0, 4);
        expect(offspring[0]).toEqual([3, 4, 5, 6, 1, 2, 7]);
        expect(offspring[1]).toEqual([1, 2, 3, 4, 7, 5, 6]);

        offspring = ga.pmx(p1, p2);
    });
});