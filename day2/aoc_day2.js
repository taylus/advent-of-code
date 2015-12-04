(function() {
    'use strict';
    document.getElementById("file-upload").addEventListener("change", function(e) {
        var file = e.target.files[0];
        if (!file) return;
        var reader = new FileReader();
        reader.onload = function(e) {
            //read file as an array of LengthxWidthxHeight strings
            var fileContents = e.target.result.split(/[\s]+/);
            var totalPaper = 0;
            var totalRibbon = 0;
            for (var i = 0; i < fileContents.length; i++) {
                if (fileContents[i] === '') continue;
                var box = parseBox(fileContents[i]);
                totalPaper += paperNeeded(box);
                totalRibbon += ribbonNeeded(box);
            }
            var fileDisplay = document.getElementById("file-display");
            fileDisplay.innerHTML = "Total amount of paper needed (in feet): " + totalPaper;
            fileDisplay.innerHTML += "<br/>Total amount of ribbon needed (in feet): " + totalRibbon;
        };
        reader.readAsText(file);
    });
    
    //takes a box dimensions as a string of the format LengthxWidthxHeight
    //and returns an box object with those values as numbers
    function parseBox(boxDimensions) {
        var dimensions = boxDimensions.split("x");
        return {
            length: parseInt(dimensions[0], 10),
            width: parseInt(dimensions[1], 10),
            height: parseInt(dimensions[2], 10)
        };
    }
    
    //returns the surface area of the given box object
    function surfaceArea(box) {
        return (2 * box.length * box.width) + 
               (2 * box.width * box.height) + 
               (2 * box.height * box.length);
    }
    
    //returns the area of the smallest side of the given box object
    function areaOfSmallestSide(box) {
        var sortedDimensions = [box.length, box.width, box.height].sort(function(a, b) { return a - b; });
        return sortedDimensions[0] * sortedDimensions[1];
    }
    
    //returns the amount of wrapping paper needed to wrap the given box object
    function paperNeeded(box) {
        return surfaceArea(box) + areaOfSmallestSide(box);
    }
    
    //returns the volume of the given box object
    function volume(box) {
        return box.length * box.width * box.height;
    }
    
    //returns the perimeter of the smallest side of the given box object
    function perimeterOfSmallestSide(box) {
        var sortedDimensions = [box.length, box.width, box.height].sort(function(a, b) { return a - b; });
        return (2 * sortedDimensions[0]) + (2 * sortedDimensions[1]);
    }
    
    //returns the amount of ribbon needed to wrap the given box object
    function ribbonNeeded(box) {
        return volume(box) + perimeterOfSmallestSide(box);
    }
}());