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
        var u1 = knots[k + 0].val();
        var u2 = knots[k + 1].val();
        var u3 = knots[k + 2].val();
        var u4 = knots[k + 3].val();
        var u5 = knots[k + 4].val();
        var u6 = knots[k + 5].val();

        var p10 = nodes[k + 0].pos();
        var p20 = nodes[k + 1].pos();
        var p30 = nodes[k + 2].pos();
        var p40 = nodes[k + 3].pos();

        var p21 = p10.multiply((u4 - t) / (u4 - u1)).add(p20.multiply((t - u1) / (u4 - u1)));
        var p31 = p20.multiply((u5 - t) / (u5 - u2)).add(p30.multiply((t - u2) / (u5 - u2)));
        var p41 = p30.multiply((u6 - t) / (u6 - u3)).add(p40.multiply((t - u3) / (u6 - u3)));

        var p32 = p21.multiply((u4 - t) / (u4 - u2)).add(p31.multiply((t - u2) / (u4 - u2)));
        var p42 = p31.multiply((u5 - t) / (u5 - u3)).add(p41.multiply((t - u3) / (u5 - u3)));

        return p32.multiply((u4 - t) / (u4 - u3)).add(p42.multiply((t - u3) / (u4 - u3)));
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
