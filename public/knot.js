
var Knot = function(_value, _id, _isTimeKnot) {
    this.id = _id
    this.isTimeKnot = _isTimeKnot;
    this.value = _value;
};

KNOTRADIUS = 5;

Knot.prototype.draw = function(ctx)
{
    var pos = timeToRuler(this.value, this.isTimeKnot);
    drawCircle(ctx, pos.x, pos.y, KNOTRADIUS);
    var text = ""+this.id;
    if (this.isTimeKnot) {
        text = "t = "+this.value.toFixed(2); //fill 2
    }
    drawText(ctx, pos.x+KNOTRADIUS+4, pos.y+KNOTRADIUS, text);
}

Knot.prototype.isInside = function(px,py)
{
    var pos = timeToRuler(this.value, this.isTimeKnot);
    var dist = (px-pos.x)*(px-pos.x) + (py-pos.y)*(py-pos.y);
	var radius = (2*KNOTRADIUS)*(2*KNOTRADIUS);
    return dist <= radius;
}

