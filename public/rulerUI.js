
RLSTATE = {
	SelectKnot : 0,
	MoveKnot : 1,
	Idle : 2
};

var rlState = RLSTATE.Idle;
var activeKnot = null;

function rlMousePress(evt)
{
	var pos = getMousePos(evt);
    activeKnot = null;
    for (var i = 0; i < curve.knots.length; i++) {
        if (curve.knots[i].isInside(pos.x,pos.y)) {
            activeKnot = curve.knots[i];
            break;
        }
    }

    if (activeKnot == null) {
        if (curve.timeKnot.isInside(pos.x,pos.y)) {
            activeKnot = curve.timeKnot;
        }
    }

    if (activeKnot != null) {
        rlState = RLSTATE.SelectKnot;
    }
}

function rlMouseMove(evt)
{
	var pos = getMousePos(evt);
    if (rlState == RLSTATE.SelectKnot || rlState == RLSTATE.MoveKnot) {
        var time = rulerToTime(pos.x,pos.y);
        activeKnot.value = time;
    }
}

function rlMouseRelease(evt)
{
    activeKnot = null;
    rlState = RLSTATE.Idle;
}

PAD_LEFT = 1;
PAD_RIGHT = 2;

function timeToRuler(time, isTimeKnot)
{
    var length = curve.nodes.length + PAD_LEFT + PAD_RIGHT;
    var pos = PAD_LEFT + time;
    var px = domRuler.width * pos/length;
    var py = domRuler.height * (1 + 2*isTimeKnot)/4.0;

    return {x: px, y: py};
}

function rulerToTime(px, py)
{
    var length = curve.nodes.length + PAD_LEFT + PAD_RIGHT;
    return (px * length / domRuler.width) - PAD_LEFT;
}