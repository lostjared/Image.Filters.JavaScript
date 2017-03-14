var picture_index = 0;
var image = new Image();
var image2 = new Image();
var images = new Array();
images[0] = new Image();
images[1] = new Image();
images[2] = new Image();
images[3] = new Image();

images[0].onload = function() {}
images[0].src="flower1.png";
images[1].onload = function() { }
images[1].src="flower2.png";
images[2].onload = function() {}
images[2].src="fractal.png";
images[3].onload = function() {}
images[3].src="buddha.png";
	

window.addEventListener("load", Init, false);
window.addEventListener("keyup", keyPressed, true);

var Debugger = { };
Debugger.log = function(message) {
	
	try {
		console.log(message);
	}
	catch(exception) {
		return;
	}	
}

function Init() {
	canvasMain();
}

function canvasSupport() {
	
}

var can_obj, bdata;
var frame = 0;
var bdata, cdata;


function changeImage() {
	var index = document.getElementById("mysel2").selectedIndex;
	picture_index = index;
}

function changeFrame() {
	var index = document.getElementById("mysel").selectedIndex;
	frame = index;	
}

function canvasMain() {
	can_obj = new canvasObject(640, 360);
}

var theCanvas, context;


function canvasObject(w, h) {
	
	this.width_ = w;
	this.height_ = h;
	var scale = 1.0;
	var theCanvas = document.getElementById("can1");
	var context = theCanvas.getContext("2d");	
	var direction = 1;
	
	function getpixel(data, x, y) {
		var offset = (x*4)+(y*4)*w;
		return [ data[offset], data[offset+1], data[offset+2] ];
	}
	
	
 	function drawScreen() {

		var inc = 0;
		var offset = 0;
		context.drawImage(images[picture_index], 0, 0);
	//	bdata = context.getImageData(0, 0, images[picture_index].width, images[picture_index].height);
		bdata = context.getImageData(0,0,640,360);		
		for(var y = 0; y < images[picture_index].height; ++y) {
			for(var x = 0; x < images[picture_index].width; ++x) {
				var offset = (x*4)+(y*4)*images[picture_index].width;
				
				var pix1, pix2;
				pix2 = getpixel(bdata.data, x, y);
				
				if(frame == 0) {
					for(q = 0; q < 3; ++q) {
						var value = (pix2[q]+x)*scale;
						if(value > 254) value = value%255;
						bdata.data[offset+q] = value;
					}
				}
				else if(frame == 1) {
					for(q = 0; q < 3; ++q) {
						var value = (pix2[q]+y)*scale;
						if(value > 254) value = value%255;
						bdata.data[offset+q] = value;
					}	
				}
				else if(frame == 2) {
					for(q = 0; q < 3; ++q) {
						var value = (pix2[q])*scale;
						if(value > 254) value = value%255;
						bdata.data[offset+q] = value;
					}	
				}	
				else if(frame == 3) {		
					for(q = 0; q < 3; ++q) {
						var value = pix2[0]+(pix2[q])*(scale);
						if(value > 254) value = value%255;
						bdata.data[offset+q] = value;
					}
				}
				else if(frame == 4) {		
					for(q = 0; q < 3; ++q) {
						var value = ((pix2[q])*(scale)/(1+Math.random()));
						if(value > 254) value = value%255;
						bdata.data[offset+q] = value;
					}
				}
				else if(frame == 5) {		
					for(q = 0; q < 3; ++q) {
						var value = ((pix2[2-q])*(scale))
						if(value > 254) value = value%255;
						bdata.data[offset+q] = value;
					}
				}
				else if(frame == 6) {		
					for(q = 0; q < 3; ++q) {
						var value = pix2[q]+(x*scale);
						if(value > 254) value = value%255;
						bdata.data[offset+q] = value;
					}
				}
				else if(frame == 7) {		
					for(q = 0; q < 3; ++q) {
						var value = pix2[q]+(y*scale);
						if(value > 254) value = value%255;
						bdata.data[offset+q] = value;
					}
				}
				else if(frame == 8) {		
					for(q = 0; q < 3; ++q) {
						var value = pix2[q]+((x+y)*scale);
						if(value > 254) value = value%255;
						bdata.data[offset+q] = value;
					}
				}

			}
		}
		
		if(direction == 1) {
				scale += 0.1;
				if(scale > 6) { scale = 6; direction = 2; }
		} else if(direction == 2) {
			scale -= 0.1;
			if(scale <= 1) { scale=1; direction = 1;}
		}
		
			
		context.putImageData(bdata, 0, 0);
	}
	
	this.keyUp = function (key) {
		Debugger.log("Keypressed: " + key);
		drawScreen();
	}
	
	setInterval(drawScreen, 25);
	drawScreen();
}


function keyPressed(key) {
	
	var key_down = String.fromCharCode(key.keyCode);
	can_obj.keyUp(key_down);
}


