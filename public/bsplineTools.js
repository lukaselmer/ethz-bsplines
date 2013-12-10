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
        var n = curve.nodes.length;
        var m = curve.knots.length;
        var t = curve.timeKnot.val();
        var k = 0;
        for (var l = 3; l < (m - 2); l++) {
            if (curve.knots[l].val() >= t) {
                break;
            }
            k++;
        }

        if (t >= curve.knots[2].val() && t < curve.knots[m - 3].val()) {
            var u1 = curve.knots[k + 0].val();
            var u2 = curve.knots[k + 1].val();
            var u3 = curve.knots[k + 2].val();
            var u4 = curve.knots[k + 3].val();
            var u5 = curve.knots[k + 4].val();
            var u6 = curve.knots[k + 5].val();

            var p1 = curve.nodes[k + 0].pos();
            var p2 = curve.nodes[k + 1].pos();
            var p3 = curve.nodes[k + 2].pos();
            var p4 = curve.nodes[k + 3].pos();

            //setColors(ctx, 'black', 'blue');
            drawCircle(ctx, p1.x, p1.y, 4);
            drawCircle(ctx, p2.x, p2.y, 4);
            drawCircle(ctx, p3.x, p3.y, 4);
            drawCircle(ctx, p4.x, p4.y, 4);
            drawLine(ctx, p1.x, p1.y, p2.x, p2.y);
            drawLine(ctx, p2.x, p2.y, p3.x, p3.y);
            drawLine(ctx, p3.x, p3.y, p4.x, p4.y);

            var p23t = p1.multiply((u4 - t) / (u4 - u1)).add(p2.multiply((t - u1) / (u4 - u1)));
            var p34t = p2.multiply((u5 - t) / (u5 - u2)).add(p3.multiply((t - u2) / (u5 - u2)));
            var p45t = p3.multiply((u6 - t) / (u6 - u3)).add(p2.multiply((t - u3) / (u6 - u3)));
            drawLine(ctx, p23t.x, p23t.y, p34t.x, p34t.y);
            drawLine(ctx, p34t.x, p34t.y, p45t.x, p45t.y);
            //setColors(ctx, 'red', 'orange');
            drawCircle(ctx, p23t.x, p23t.y, 3);
            drawCircle(ctx, p34t.x, p34t.y, 3);
            drawCircle(ctx, p45t.x, p45t.y, 3);

            var p3tt = (u4 - t) / (u4 - u2) * p23t + (t - u2) / (u4 - u2) * p34t;
            var p4tt = (u5 - t) / (u5 - u3) * p34t + (t - u3) / (u5 - u3) * p45t;
            drawLine(ctx, p3tt.x, p3tt.y, p4tt.x, p4tt.y);
            //setColors(ctx, 'violet', 'pink');
            drawCircle(ctx, p3tt.x, p3tt.y, 2);
            drawCircle(ctx, p4tt.x, p4tt.y, 2);

            var pttt = (u4 - t) / (u4 - u3) * p3tt + (t - u3) / (u4 - u3) * p4tt;
            //setColors(ctx, 'green', 'darkgreen');
            drawCircle(ctx, pttt.x, pttt.y, 4);
        }
    };

    drawBezierNodes = function (ctx, curve) {
        // TODO: implement this
    };


})();
