function loadImage()
{

	var imageCanvas = document.getElementById("imageCanvas");
	var imageCanvasContext = imageCanvas.getContext("2d");
	
	var imageData = new Image();
	
	imageData.onload = function () {
		imageCanvasContext.drawImage(imageData, 0, 0);
	}
	
	imageData.src = "chicken.png";

function initializeImageArray()
{
	var canvas = document.getElementById("imageCanvas");
	var context = canvas.getContext("2d");
	
	var pixelCount = canvas.width * canvas.height;
	
	for(var i = 0; i < pixelCount; i++)
	{
		var pixel = context.getImageData(get2DXValue(i, canvas.width), get2DYValue(i, canvas.width), 1, 1);
		image.push({index:i, color:pixel});
	}
}

function swapImageData(index1, index2)
{
	var canvas = document.getElementById("imageCanvas");
	var context = canvas.getContext("2d");
	
	//Swap in canvas data
	var colorA = image[index1].color;
	var colorB = image[index2].color;
	
	var x1 = get2DXValue(index1, canvas.width);
	var y1 = get2DYValue(index1, canvas.width);
	
	var x2 = get2DXValue(index2, canvas.width);
	var y2 = get2DYValue(index2, canvas.width);
	
	context.putImageData(colorB, x1, y1);
	context.putImageData(colorA, x2, y2);
	
	//Swap in image array
	var c = image[index1];
	image[index1] = image[index2];
	image[index2] = c;
}

	
}