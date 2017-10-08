function loadImage()
{

	var imageCanvas = document.getElementById("imageCanvas");
	var imageCanvasContext = imageCanvas.getContext("2d");
	
	var imageData = new Image();
	
	imageData.onload = function () {
		imageCanvasContext.drawImage(imageData, 0, 0);
	}
	
	imageData.src = "chicken.png";
	
}
