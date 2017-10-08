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

	
}