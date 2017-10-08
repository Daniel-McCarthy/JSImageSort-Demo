var image = [];
var sourceCanvas = document.createElement("canvas");
var sourceContext = sourceCanvas.getContext("2d");
sourceCanvas.width = 32;
sourceCanvas.height = 32;

sourceContext.imageSmoothingEnabled = false;

function loadImage()
{
	document.getElementById("imageCanvas").getContext("2d").imageSmoothingEnabled = false;

	var imageData = new Image();
	
	imageData.onload = function () {
		sourceContext.drawImage(imageData, 0, 0);
	}
	
	imageData.src = "chicken32.png";
}


function startSort()
{
	initializeImageArray();
	shuffleCanvas();
	setInterval(gnomeSort, 0);
}

function initializeImageArray()
{

	var pixelCount = sourceCanvas.width * sourceCanvas.height;
	
	for(var i = 0; i < pixelCount; i++)
	{
		var pixel = sourceContext.getImageData(get2DXValue(i, sourceCanvas.width), get2DYValue(i, sourceCanvas.width), 1, 1);
		image.push({index:i, color:pixel});
	}
}

function swapImageData(index1, index2)
{

	//Swap in canvas data
	var colorA = image[index1].color;
	var colorB = image[index2].color;
	
	var x1 = get2DXValue(index1, sourceCanvas.width);
	var y1 = get2DYValue(index1, sourceCanvas.width);
	
	var x2 = get2DXValue(index2, sourceCanvas.width);
	var y2 = get2DYValue(index2, sourceCanvas.width);
	
	sourceContext.putImageData(colorB, x1, y1);
	sourceContext.putImageData(colorA, x2, y2);
	
	//Swap in image array
	var c = image[index1];
	image[index1] = image[index2];
	image[index2] = c;
}

function updateDisplayCanvas()
{
	var displayContext = document.getElementById("imageCanvas").getContext("2d");
	
	var src = sourceCanvas.toDataURL("image/png");
	var img = document.createElement('img');
	img.src = src;
	
	displayContext.drawImage(img, 0, 0, 256, 256);
}

function isSorted()
{
	var sorted = true;
	for(var i = 1; i < image.length; i++)
	{
			if(image[i - 1].index >= image[i].index)
			{
				sorted = false;
			}
	}
	
	return sorted;
}


var gnomeIndex = 0;
function gnomeSort()
{
	if(!sorted)
	{
		sorted = isSorted();
	
		var c;
		
		if((gnomeIndex == 0) || (image[gnomeIndex].index >= image[gnomeIndex - 1].index))
		{
			gnomeIndex++;
		}
		else
		{
			swapImageData(gnomeIndex, gnomeIndex - 1);
			gnomeIndex--;
		}
		
		updateDisplayCanvas();
	}
}

	{
		gnomeIndex++;
	}
	else
	{
		swapImageData(gnomeIndex, gnomeIndex - 1);
		gnomeIndex--;
	}
	
	updateDisplayCanvas();
}


var closestValue = 0;
var closestIndex = 0;
var selectionIndex = 0;
var selectionSecondIndex = 0;
var selectionSwapNeeded = false;

function selectionSort()
{
	if(!sorted)
	{
		sorted = isSorted();
	
		var c = 0;
		
		if(selectionIndex == 0 && selectionSecondIndex == 0)
		{

			closestValue = image[selectionIndex].index;
			closestIndex = selectionIndex;
		}
		
		if(selectionSecondIndex < image.length)
		{
			if(image[selectionSecondIndex].index < closestValue)
			{
				closestValue = image[selectionSecondIndex].index;
				closestIndex = selectionSecondIndex;
				selectionSwapNeeded = true;
			}
			selectionSecondIndex++;
		}
		else
		{
			if(selectionSwapNeeded)
			{
				swapImageData(selectionIndex, closestIndex);
			}
			
			selectionSwapNeeded = false;
		
			selectionIndex++;
			selectionSecondIndex = selectionIndex + 1;
			
			closestValue = image[selectionIndex].index;
			closestIndex = selectionIndex;

		}
		
		updateDisplayCanvas();
	}
}

function shuffleCanvas()
{
	var pixelCount = sourceCanvas.width * sourceCanvas.height;

	for(var i = 0; i < pixelCount; i++)
	{	
		var randomIndex =  Math.floor(Math.random() * ((pixelCount-1) - i) + i);
		swapImageData(i, randomIndex);
	}
}

function get2DXValue(index, width)
{
	return index - (parseInt(index / width) * width);
}

function get2DYValue(index, width)
{
	return parseInt(index / width);
}