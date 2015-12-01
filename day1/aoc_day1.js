(function() {
    'use strict';
    document.getElementById("file-upload").addEventListener("change", function(e) {
        var file = e.target.files[0];
        if (!file) return;
        var reader = new FileReader();
        reader.onload = function(e) {
            var fileContents = e.target.result;
            var fileDisplay = document.getElementById("file-display");
            fileDisplay.innerHTML = fileContents;
            
            var floor = getFloor(fileContents);
            fileDisplay.innerHTML += "<br/><br/>Santa's destination floor: " + floor;
            
            var basementPosition = getBasementPosition(fileContents);
            fileDisplay.innerHTML += "<br/>Position at which Santa enters the basement: " + basementPosition;
        };
        reader.readAsText(file);
    });
    
    function getFloor(input) {
        var leftParens = (input.match(/\(/g) || []).length;
        var rightParens = (input.match(/\)/g) || []).length;
        return leftParens - rightParens;
    }
    
    function getBasementPosition(input) {
        var currentFloor = 0;
        for(var i = 0; i < input.length; i++) {
            if (input[i] == '(')
                currentFloor++;
            else if (input[i] == ')')
                currentFloor--;
                
            if (currentFloor < 0)
                return (i + 1);
        }
    }
}());