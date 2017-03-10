var Spring = function(a, b, length, c) {
    var p1 = a.getPos();
    var p2 = b.getPos();
    var line = new Path.Line(p1, p2);
    line.strokeColor = 'black';
    var update = function() {
        p1 = a.getPos();
        p2 = b.getPos();
        line.segments[0].point = p1;
        line.segments[1].point = p2;
        
        var p2Force = p1.subtract(p2);
        var currLength = p2Force.length;
        p2Force = p2Force.normalize(c * (currLength - length));
        var p1Force = p2Force.multiply(-1);
        a.applyForce(p1Force);
        b.applyForce(p2Force);
    };
    var getP1 = function() {
        return p1;
    }
    var getP2 = function() {
        return p2;
    }
    return {
        update: update,
        line: line,
        p1 : getP1,
        p2 : getP2,
    };
}