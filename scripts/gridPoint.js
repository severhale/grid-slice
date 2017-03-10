var GridPoint = function(x, y) {
    var pos = new Point(x, y);
    var vel = new Point(0, 0);
    var applyForce = function(f) {
        vel = vel.add(f);
    };
    var update = function() {
        var mag = vel.length;
        vel = vel.multiply(.6 + .4 * (mag / (mag + 1)));
        vel = vel.multiply(1 - .2*(mag/(mag + 10)));
        pos = pos.add(vel);
    };
    var getPos = function() {
        return pos;
    }
    var getVel = function() {
        return vel;
    };
    var setPos = function(newPos) {
        pos = newPos;
    };
    return {
        applyForce : applyForce,
        update : update,
        getPos : getPos,
        setPos : setPos,
        getVel : getVel
    };
}