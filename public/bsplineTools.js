"use strict";

// you can use: drawLine(ctx, x1, y1, x2, y2);
// you can use: drawLine(ctx, x1, y1, x2, y2);
// you can use: drawCircle(ctx, x, y, radius);

// Export only these methods
var drawCurve, drawConstruction, drawBezierNodes;

(function () {

    function drawBezier(ctx, r1, r2, r3, r4) {
        setColors(ctx, 'cyan', 'cyan');

        drawCircle(ctx, r1.x, r1.y, 1);
        drawCircle(ctx, r2.x, r2.y, 1);
        drawCircle(ctx, r3.x, r3.y, 1);
        drawCircle(ctx, r4.x, r4.y, 1);

        drawLine(ctx, r1.x, r1.y, r2.x, r2.y);
        drawLine(ctx, r2.x, r2.y, r3.x, r3.y);
        drawLine(ctx, r3.x, r3.y, r4.x, r4.y);
    }

    function drawBspline(ctx, p10, p20, p30, p40, p21, p31, p41, p32, p42, p43) {
        setColors(ctx, 'yellow', 'cyan');
        drawCircle(ctx, p10.x, p10.y, 4);
        drawCircle(ctx, p20.x, p20.y, 4);
        drawCircle(ctx, p30.x, p30.y, 4);
        drawCircle(ctx, p40.x, p40.y, 4);
        drawLine(ctx, p10.x, p10.y, p20.x, p20.y);
        drawLine(ctx, p20.x, p20.y, p30.x, p30.y);
        drawLine(ctx, p30.x, p30.y, p40.x, p40.y);

        setColors(ctx, 'red', 'orange');
        drawCircle(ctx, p21.x, p21.y, 3);
        drawCircle(ctx, p31.x, p31.y, 3);
        drawCircle(ctx, p41.x, p41.y, 3);
        drawLine(ctx, p21.x, p21.y, p31.x, p31.y);
        drawLine(ctx, p31.x, p31.y, p41.x, p41.y);

        setColors(ctx, 'violet', 'pink');
        drawCircle(ctx, p32.x, p32.y, 2);
        drawCircle(ctx, p42.x, p42.y, 2);
        drawLine(ctx, p32.x, p32.y, p42.x, p42.y);

        setColors(ctx, 'green', 'darkgreen');
        drawCircle(ctx, p43.x, p43.y, 4);
    }

    /**
     * Calculates the point on the line for the value t. If ctx is set, the construction is drawn.
     * @param t
     * @param curve
     * @param ctx
     * @returns The point on the curve
     */
    function calcDrawBspline(t, curve, ctx) {
        var m = curve.knots.length;
        var k = 0;
        for (var l = 3; l < (m - 2); l++) {
            if (curve.knots[l].val() >= t) break;
            k++;
        }

        if (t >= curve.knots[2].val() && t < curve.knots[m - 3].val()) {
            var u1 = curve.knots[k + 0].val();
            var u2 = curve.knots[k + 1].val();
            var u3 = curve.knots[k + 2].val();
            var u4 = curve.knots[k + 3].val();
            var u5 = curve.knots[k + 4].val();
            var u6 = curve.knots[k + 5].val();

            var p10 = curve.nodes[k + 0].pos();
            var p20 = curve.nodes[k + 1].pos();
            var p30 = curve.nodes[k + 2].pos();
            var p40 = curve.nodes[k + 3].pos();

            var p21 = p10.multiply((u4 - t) / (u4 - u1)).add(p20.multiply((t - u1) / (u4 - u1)));
            var p31 = p20.multiply((u5 - t) / (u5 - u2)).add(p30.multiply((t - u2) / (u5 - u2)));
            var p41 = p30.multiply((u6 - t) / (u6 - u3)).add(p40.multiply((t - u3) / (u6 - u3)));

            var p32 = p21.multiply((u4 - t) / (u4 - u2)).add(p31.multiply((t - u2) / (u4 - u2)));
            var p42 = p31.multiply((u5 - t) / (u5 - u3)).add(p41.multiply((t - u3) / (u5 - u3)));

            var p43 = p32.multiply((u4 - t) / (u4 - u3)).add(p42.multiply((t - u3) / (u4 - u3)));

            if (ctx) drawBspline(ctx, p10, p20, p30, p40, p21, p31, p41, p32, p42, p43);

            return p43;
        }
    }

    function calcBezier(t1, t2, t3, curve) {
        var m = curve.knots.length;
        var k = 0;
        for (var l = 3; l < (m - 2); l++) {
            if (curve.knots[l].val() >= t1) break;
            k++;
        }

        var u1 = curve.knots[k + 0].val();
        var u2 = curve.knots[k + 1].val();
        var u3 = curve.knots[k + 2].val();
        var u4 = curve.knots[k + 3].val();
        var u5 = curve.knots[k + 4].val();
        var u6 = curve.knots[k + 5].val();

        var p10 = curve.nodes[k + 0].pos();
        var p20 = curve.nodes[k + 1].pos();
        var p30 = curve.nodes[k + 2].pos();
        var p40 = curve.nodes[k + 3].pos();

        var p21 = p10.multiply((u4 - t1) / (u4 - u1)).add(p20.multiply((t1 - u1) / (u4 - u1)));
        var p31 = p20.multiply((u5 - t1) / (u5 - u2)).add(p30.multiply((t1 - u2) / (u5 - u2)));
        var p41 = p30.multiply((u6 - t1) / (u6 - u3)).add(p40.multiply((t1 - u3) / (u6 - u3)));

        var p32 = p21.multiply((u4 - t2) / (u4 - u2)).add(p31.multiply((t2 - u2) / (u4 - u2)));
        var p42 = p31.multiply((u5 - t2) / (u5 - u3)).add(p41.multiply((t2 - u3) / (u5 - u3)));

        var p43 = p32.multiply((u4 - t3) / (u4 - u3)).add(p42.multiply((t3 - u3) / (u4 - u3)));

        return p43;
    }

    drawCurve = function (ctx, curve) {
        if (curve.nodes.length < 4) return;

        var lknot = curve.knots[2].val();
        var rknot = curve.knots[curve.knots.length - 3].val();

        var samples = 1000;
        var l = calcDrawBspline(lknot, curve, undefined);

        for (var i = 1; i < samples; i++) {
            var t = lknot + (rknot - lknot) / samples * i;
            var r = calcDrawBspline(t, curve, undefined);
            drawLine(ctx, l.x, l.y, r.x, r.y);
            l = r;
        }
    };

    drawConstruction = function (ctx, curve) {
        calcDrawBspline(curve.timeKnot.val(), curve, ctx);
    };

    drawBezierNodes = function (ctx, curve) {
        for (var i = 2; i < curve.knots.length - 3; i++) {

            var t1 = curve.knots[i].val();
            var t2 = curve.knots[i + 1].val();

            if (curve.timeKnot.val() >= t1 && curve.timeKnot.val() <= curve.knots[i + 1].val()) {
                var r1 = calcBezier(t1, t1, t1, curve);
                var r2 = calcBezier(t1, t2, t1, curve);
                var r3 = calcBezier(t1, t2, t2, curve);
                var r4 = calcBezier(t2, t2, t2, curve);

                drawBezier(ctx, r1, r2, r3, r4);

                break;
            }
        }
    };


})();
