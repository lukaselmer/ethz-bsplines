
function setColors(ctx,stroke,fill) {
	if(typeof(stroke)==='undefined') stroke = 'black';
	if(typeof(fill)==='undefined') fill = 'blue';
	ctx.fillStyle = fill;
	ctx.strokeStyle = stroke;
}

function drawLine(ctx, px, py, qx, qy) {
	ctx.beginPath();
	ctx.moveTo(px, py);
	ctx.lineTo(qx, qy);
	ctx.stroke();
}

function drawCircle(ctx,x,y,r) {
	ctx.beginPath();
	ctx.arc(x,y,r,0,2*Math.PI,false);
	ctx.fill();
	ctx.lineWidth = 1;
	ctx.stroke();
}

function drawText(ctx,x,y,str) {
	var oldFill = ctx.fillStyle;
	ctx.font = '12pt Calibri';
	ctx.fillStyle = 'rgb(10,70,160)';
	ctx.fillText(str, x, y);
	ctx.fillStyle = oldFill;
}

function getMousePos(evt) {
	var rect = evt.target.getBoundingClientRect();
	return {
	  x: evt.clientX - rect.left,
	  y: evt.clientY - rect.top
	};
}