"use strict";

var Point = function (_x, _y) {
    this.x = _x;
    this.y = _y;
};

Point.prototype.setPos = function (_x, _y) {
    this.x = _x;
    this.y = _y;
}

Point.prototype.multiply = function (scalar) {
    return new Point(this.x * scalar, this.y * scalar);
}

Point.prototype.add = function (point) {
    return new Point(this.x + point.x, this.y + point.y);
}

Point.prototype.minus = function (point) {
    return new Point(this.x - point.x, this.y - point.y);
}
