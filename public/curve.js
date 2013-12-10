"use strict";

var showConstruction = false;
var showNodeConnections = true;
var showBezierNodes = false;

var Curve = function () {
    this.timeKnot = new Knot(0, 0, true);
    this.knots = new Array();
    this.nodes = new Array();
};

Curve.prototype.draw = function (ctx) {
    if (showNodeConnections) {
        // Connect nodes with a line
        setColors(ctx, 'rgb(10,70,160)');
        for (var i = 1; i < this.nodes.length; i++) {
            drawLine(ctx, this.nodes[i - 1].x, this.nodes[i - 1].y, this.nodes[i].x, this.nodes[i].y);
        }
        // Draw nodes
        setColors(ctx, 'rgb(10,70,160)', 'white');
        for (var i = 0; i < this.nodes.length; i++) {
            this.nodes[i].draw(ctx);
        }
    }

    ctx.lineWidth = 2;
    setColors(ctx, 'black');

    // TODO: Draw the curve
    // you can use: drawLine(ctx, x1, y1, x2, y2);

    ctx.lineWidth = 1;

    if (this.nodes.length >= 4) {
        // TODO: Show how the curve is constructed
        // you can use: drawLine(ctx, x1, y1, x2, y2);
        // you can use: drawCircle(ctx, x, y, radius);


        // De Boor construction
        if (showConstruction) {

            // ...

        }

        // Bézier node construction
        if (showBezierNodes) {

            // ...

        }
    }
}

Curve.prototype.addNode = function (x, y) {
    this.nodes.push(new Node(x, y));
    if (this.knots.length == 0) {
        this.knots.push(new Knot(0, 0, false));
        this.knots.push(new Knot(1, 1, false));
        this.knots.push(new Knot(2, 2, false));
    } else {
        this.knots.push(new Knot(this.knots.length, this.knots.length, false));
    }
}


