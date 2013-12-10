
var Node = function(_x,_y) {
	this.x = _x;
	this.y = _y;
};

NODERADIUS = 4;

Node.prototype.setPos = function(_x,_y)
{
    this.x = _x;
	this.y = _y;
}

Node.prototype.draw = function(ctx)
{
    drawCircle(ctx, this.x, this.y , NODERADIUS);
}

Node.prototype.isInside = function(px,py)
{
    var dist = (px-this.x)*(px-this.x) + (py-this.y)*(py-this.y);
    var radius = (2*NODERADIUS)*(2*NODERADIUS);
    return dist <= radius;
}
