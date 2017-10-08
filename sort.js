function loadImage()
{

	var imageCanvas = document.getElementById("imageCanvas");
	var imageCanvasContext = imageCanvas.getContext("2d");
	
	var image = new Image();
	
	image.onload = function () {
		imageCanvasContext.drawImage(image, 0, 0);
	}
	
	image.src = "chicken.png";
	
}

