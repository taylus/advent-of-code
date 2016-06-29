/* jshint strict: true, undef: true, unused: true */
/* globals QUnit */
(function() {
    "use strict";
    
    /** 
     * Returns the longest increasing sequence in the given array.
     * In the case of ties, the first sequence is returned.
     * @param {Number[]} array - An array of numbers. Should not contain objects or null/undefined elements.
     */
    function longestIncreasingSequence(array) {
        console.log("Evaluating input: " + JSON.stringify(array));
        if (!array) return undefined;
        var currentSequence = [], allSequences = [];
        if(array.length > 0) currentSequence.push(array[0]);
        for (var i = 0; i < array.length - 1; i++) {
            var x = array[i];
            var y = array[i + 1];
            console.log("Begin evaluating (" + x + ", " + y + ")... current sequence: " + JSON.stringify(currentSequence) + ", all sequences: " + JSON.stringify(allSequences));
            if (y >= x) {
                currentSequence.push(y);
            }
            else {
                allSequences.push(currentSequence);
                currentSequence = [y];
            }
            console.log("End evaluating (" + x + ", " + y + ")... current sequence: " + JSON.stringify(currentSequence) + ", all sequences: " + JSON.stringify(allSequences));
        }
        allSequences.push(currentSequence);
        return allSequences.sort(function(a, b) { return b.length - a.length; })[0];
    }
    
    function test(input, expected) {
        QUnit.test("Test that " + JSON.stringify(input) + " -> " + JSON.stringify(expected), function(assert) {
            assert.deepEqual(longestIncreasingSequence(input), expected, "Test passed.");
        });
    }

    test(null, undefined);
    test(undefined, undefined);
    test([null], [null]);
    test([], []);
    test([1], [1]);
    test([1, 2], [1, 2]);
    test([1, 2, 3], [1, 2, 3]);
    test([1, 2, 3, 2], [1, 2, 3]);
    test([4, 3, 2, 1], [4]);
    test([4, 3, 2, 3], [2, 3]);
    test([1, 2, 5, 10, 3, 4, 20, 30, 50, 2], [3, 4, 20, 30, 50]);
}());
