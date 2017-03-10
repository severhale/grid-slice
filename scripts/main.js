paper.install(window);

var springs;
var points;

window.onload = function() {
    var canvas = document.getElementById("canvas");
    paper.setup(canvas);
    
    points = [];
    springs = [];
    
    var meshSize = 15;
    var w = (view.bounds.width/meshSize) + 1;
    var h = (view.bounds.height/meshSize) + 1;
    
    for (var i=0; i<w; i++) {
        points[i]=[];
        for (var j=0; j<h; j++) {
            points[i][j] = new GridPoint(i*meshSize, j*meshSize);
        }
    }
    
    var springLength = meshSize/2;
    var springConstant = .1;
    for (var i=0; i<w-1; i++) {
        for (var j=0; j<h-1; j++) {
            var p = points[i][j];
            var right = points[i+1][j];
            var down = points[i][j+1];
            
            springs.push(new Spring(p, right, springLength, springConstant));
            if (i > 0) {
                springs.push(new Spring(p, down, springLength, springConstant));
            }
        }
    }
    
    view.onFrame = function(event) {
        
        for (var i=1; i<w-1; i++) {
            for (var j=1; j<h-1; j++) {
                points[i][j].update();
            }
        }
        for (var i=0; i<springs.length; i++) {
            springs[i].update();
        }
    }
    
    var tool = new Tool();
    tool.onMouseDrag = function(event) {
        for (var i=0; i<springs.length; i++) {
            var spring = springs[i];
            if (intersect(spring.p1(), spring.p2(), event.lastPoint, event.point) && Math.random() < .9) {
                spring.line.remove();
                springs.splice(i, 1);
            }
        }
    }
}