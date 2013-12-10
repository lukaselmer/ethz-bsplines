"use strict";

// you can use: drawLine(ctx, x1, y1, x2, y2);
// you can use: drawLine(ctx, x1, y1, x2, y2);
// you can use: drawCircle(ctx, x, y, radius);

// Export only these methods
var drawCurve, drawConstruction, drawBezierNodes;

(function () {

    function calcBspline(t, nodes, knots) {
        var k = 0;
        for (var l = 3; l < (knots.length - 2); l++) {
            if (knots[l].val() >= t) break;
            k++;
        }
        var k1 = knots[k + 0].val();
        var k2 = knots[k + 1].val();
        var k3 = knots[k + 2].val();
        var k4 = knots[k + 3].val();
        var k5 = knots[k + 4].val();
        var k6 = knots[k + 5].val();

        var p1 = nodes[k + 0].pos();
        var p2 = nodes[k + 1].pos();
        var p3 = nodes[k + 2].pos();
        var p4 = nodes[k + 3].pos();

        var p23t = p1.multiply((k4 - t) / (k4 - k1)).add(p2.multiply((t - k1) / (k4 - k1)));
        var p34t = p2.multiply((k5 - t) / (k5 - k2)).add(p3.multiply((t - k2) / (k5 - k2)));
        var p45t = p3.multiply((k6 - t) / (k6 - k3)).add(p4.multiply((t - k3) / (k6 - k3)));

        var p3tt = p23t.multiply((k4 - t) / (k4 - k2)).add(p34t.multiply((t - k2) / (k4 - k2)));
        var p4tt = p34t.multiply((k5 - t) / (k5 - k3)).add(p45t.multiply((t - k3) / (k5 - k3)));

        return p3tt.multiply((k4 - t) / (k4 - k3)).add(p4tt.multiply((t - k3) / (k4 - k3)));
    }

    drawCurve = function (ctx, curve) {
        if (curve.nodes.length < 4) return;

        var lknot = curve.knots[2].val();
        var rknot = curve.knots[curve.knots.length - 3].val();

        var samples = 1000;
        var l = calcBspline(lknot, curve.nodes, curve.knots);

        for (var i = 1; i < samples; i++) {
            var t = lknot + (rknot - lknot) / samples * i;
            var r = calcBspline(t, curve.nodes, curve.knots);
            drawLine(ctx, l.x, l.y, r.x, r.y);
            l = r;
        }
    };

    drawConstruction = function (ctx, curve) {
        // TODO: implement this

    };

    drawBezierNodes = function (ctx, curve) {
        // TODO: implement this
    };


})();
