paper.install(window);

var springs, points, meshSize, w, h, springLength, springConstant, initialized;

intialized = false;

function resetGrid() {
    if (!initialized) {
        points = [];
        springs = [];
    }
    
    meshSize = view.bounds.width / 40;
    w = (view.bounds.width/meshSize) + 1;
    h = (view.bounds.height/meshSize) + 1;
    
    for (var i=0; i<w; i++) {
        if (!initialized) {
            points[i]=[];
        }
        for (var j=0; j<h; j++) {
            if (!initialized) {
                points[i][j] = new GridPoint(i*meshSize, j*meshSize);
            }
//            else {
//                points[i][j].setPos(new Point(i*meshSize, j*meshSize));
//            }
        }
    }
    
    springLength = meshSize/2;
    springConstant = .1;
    if (!initialized) {
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
    }
    else {
        for (var i=0; i<springs.length; i++) {
            springs[i].setConstant(springConstant);
        }
    }
    initialized = true;
}

window.onload = function() {
    
    var canvas = document.getElementById("canvas");
    paper.setup(canvas);
    
    resetGrid();
    
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
    
    view.onResize = function(event) {
        var newMeshSize = view.bounds.width / 40;
        var meshRatio = newMeshSize / meshSize;
        for (var i=0; i<w; i++) {
            for (var j=0; j<h; j++) {
                points[i][j].setPos(points[i][j].getPos().multiply(meshRatio));
            }
        }
        for (var i=0; i<springs.length; i++) {
            springs[i].setLength(newMeshSize/2);
        }
        meshSize = newMeshSize;
    }
    
    var tool = new Tool();
    tool.onMouseDrag = function(event) {
        for (var i=0; i<springs.length; i++) {
            var spring = springs[i];
            if (intersect(spring.p1(), spring.p2(), event.lastPoint, event.point) && Math.random() < .9) {
//                    spring.setConstant(spring.getConstant() * .5);
                spring.setConstant(0);
//                spring.line.remove();
//                springs.splice(i, 1);
            }
        }
    }
}

document.getElementById("restart").addEventListener("click", function() {
    resetGrid();
});