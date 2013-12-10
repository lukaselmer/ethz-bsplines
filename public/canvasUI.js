
CVSTATE = {
	AddPoint : 0,
	SelectPoint : 1,
	MovePoint : 2,
	Idle : 3
};

var cvState = CVSTATE.Idle;
var activeNode = null;

function cvMousePress(evt)
{
    activeNode = null;

	var pos = getMousePos(evt);
	
    // Try to find a node below the mouse
    for (var i = 0; i < curve.nodes.length; i++) {
        if (curve.nodes[i].isInside(pos.x,pos.y)) {
            activeNode = curve.nodes[i];
            break;
        }
    }

    // No node selected: add a new node
    if (activeNode == null) {
        curve.addNode(pos.x,pos.y);
        activeNode = curve.nodes[curve.nodes.length-1];
    }

    cvState = CVSTATE.SelectPoint;
}

function cvMouseMove(evt)
{
    if (cvState == CVSTATE.SelectPoint || cvState == CVSTATE.MovePoint) {
		var pos = getMousePos(evt);
        activeNode.setPos(pos.x,pos.y);
    } else {
        // No button pressed. Ignore movement.
    }
}

function cvMouseRelease(evt)
{
    cvState = CVSTATE.Idle;
    activeNode = null;
}
