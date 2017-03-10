var area = function(a, b, c) {
     return (b.x - a.x) * (c.y - a.y) - (c.x - a.x) * (b.y - a.y);
}

var intersect = function(p1, p2, t1, t2) {
    var prod1 = area(p1, t1, t2);
    var prod2 = area(p2, t1, t2);
    var intersect1 = (prod1 * prod2) < 0;
    
    var prodt1 = area(t1, p1, p2);
    var prodt2 = area(t2, p1, p2);
    var intersect2 = (prodt1 * prodt2) < 0;
    
    return intersect1 && intersect2;
}