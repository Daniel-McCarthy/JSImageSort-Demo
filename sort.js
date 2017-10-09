var image = [];
var sorted = false;
var sortInterval;
var paused = false;
var photoImage = new Image();
photoImage.src = "chicken32.png";

var sourceCanvas = document.createElement("canvas");
var sourceContext = sourceCanvas.getContext("2d");
sourceCanvas.width = 32;
sourceCanvas.height = 32;

sourceContext.imageSmoothingEnabled = false;

function loadImage()
{
	document.getElementById("imageCanvas").getContext("2d").imageSmoothingEnabled = false;

		sourceContext.drawImage(photoImage, 0, 0);
	}
	
	initializeImageArray();
}


function startSort()
{
	clearInterval(sortInterval);
	sorted = false;
	
	shuffleCanvas();
	
	var algorithm = document.getElementById("algorithmDropDownMenu").value;
	
	switch(algorithm)
	{
		case "Gnome Sort":
		{
			sortInterval = setInterval(gnomeSort, 0);
			break;
		}
		case "Insertion Sort":
		{
			sortInterval= setInterval(insertionSort, 0);
			break;
		}
		case "Selection Sort":
		{
			sortInterval = setInterval(selectionSort, 0);
			break;
		}
		case "Comb Sort":
		{
			sortInterval = setInterval(combSort, 0);
			break;
		}
		case "Shell Sort":
		{
			sortInterval = setInterval(shellSort, 0);
			break;
		}
		case "Odd Even Sort":
		{
			sortInterval = setInterval(oddEvenSort, 0);
			break;
		}
	}
	
	//Init Gnome Sort
	gnomeIndex = 0;
	
	//Init Selection Sort
	closestValue = 0;
	closestIndex = 0;
	selectionIndex = 0;
	selectionSecondIndex = 0;
	selectionSwapNeeded = false;
	
	//Init Comb Sort
	combIndex = 0;
	combWidth = 45;
	
	//Init Shell Sort
	shellInitialRun = true;
	shellIndex = 0;
	shellSecondaryIndex = 0;
	shellGap = 0;
	shellC = 0;
	shellCIndex = 0;
	
	//Odd Even Sort
	oddEvenIndex = 0;
	oddEvenSecondaryIndex = 2;
	oddEvenC = 0;
	
	//Insertion Sort
	insertionIndex = 1;
	insertionSecondIndex = 0;
	insertionSwapNeeded = false;
	insertionFirstRun = true;
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
	if(!paused)
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
		
	if(sorted)
	{
		clearInterval(sortInterval);
	}
}


var closestValue = 0;
var closestIndex = 0;
var selectionIndex = 0;
var selectionSecondIndex = 0;
var selectionSwapNeeded = false;

function selectionSort()
{
	if(!paused)
	{
		sorted = isSorted();
		
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
		
	if(sorted)
	{
		clearInterval(sortInterval);
	}
}

var combIndex = 0;
var combWidth = 45;

function combSort()
{
	if(!paused)
	{
		sorted = isSorted();
	
		if((combIndex + combWidth) < (image.length))
		{
			if(image[combIndex].index > image[combIndex + combWidth].index)
			{
				swapImageData(combIndex, combIndex + combWidth);
			}
			
			combIndex++;
		}
		else
		{
			if(combWidth > 0)
			{
				combWidth--;
			}
			combIndex = 0;
		}
		
		updateDisplayCanvas();
	}
		
	if(sorted)
	{
		clearInterval(sortInterval);
	}
}

var shellInitialRun = true;
var shellIndex = 0;
var shellSecondaryIndex = 0;
var shellGap = 0;

var shellC = 0;
var shellCIndex = 0;
function shellSort()
{
	if(!paused)
	{
		sorted = isSorted();
	
		if(shellInitialRun)
		{
			shellGap = image.length / 2;
			shellIndex = 0;
			shellSecondaryIndex = shellGap + shellIndex;
			shellCIndex = shellSecondaryIndex;
			shellInitialRun = false;
		}

		if((shellGap + shellIndex) < image.length)
		{
			
			if((shellSecondaryIndex >= shellGap) && (image[shellCIndex].index < image[shellSecondaryIndex - shellGap].index))
			{
				swapImageData(shellSecondaryIndex, shellSecondaryIndex - shellGap);
				shellCIndex = shellSecondaryIndex - shellGap;
				shellC = image[shellCIndex].index;
				shellSecondaryIndex -= shellGap;
			}
			else
			{
				swapImageData(shellSecondaryIndex, shellCIndex);
				shellIndex++;
				shellSecondaryIndex = shellGap + shellIndex;
				shellCIndex = shellSecondaryIndex;
			}

			updateDisplayCanvas();
		}
		else
		{
			shellGap = Math.floor(shellGap/2);
			shellIndex = 0;
			shellSecondaryIndex = shellGap + shellIndex;
			shellCIndex = shellSecondaryIndex;
		}
	}
		
	if(sorted)
	{
		clearInterval(sortInterval);
	}
}

var oddEvenIndex = 0;
var oddEvenSecondaryIndex = 2;
var oddEvenC = 0;

function oddEvenSort()
{
	if(!paused)
	{
		sorted = isSorted();
	
		if(oddEvenSecondaryIndex < image.length)
		{
			if(image[oddEvenSecondaryIndex].index < image[oddEvenSecondaryIndex - 1].index)
			{
				swapImageData(oddEvenSecondaryIndex, oddEvenSecondaryIndex - 1);
			}
			
			oddEvenSecondaryIndex += 2;
		}
		else
		{
			oddEvenIndex++;
			oddEvenSecondaryIndex = ((oddEvenIndex % 2) == 0) ? 2 : 1;
		}
	
		updateDisplayCanvas();
	}
		
	if(sorted)
	{
		clearInterval(sortInterval);
	}
}


var insertionIndex = 1;
var insertionSecondIndex = 0;
var insertionSwapNeeded = false;
var insertionFirstRun = true;

function insertionSort()
{
	if(!paused)
	{
		sorted = isSorted();
	

		if(insertionFirstRun)
		{
			insertionSwapNeeded = image[insertionIndex].index < image[insertionIndex - 1].index;
			insertionSecondIndex = insertionIndex;
			insertionFirstRun = false;
		}
		
		if(insertionSwapNeeded)
		{
			swapImageData(insertionSecondIndex, insertionSecondIndex -1);
			
			insertionSecondIndex--;
			
			if(insertionSecondIndex > 0)
			{
				insertionSwapNeeded = image[insertionSecondIndex].index < image[insertionSecondIndex - 1].index;
			}
			else
			{
				insertionSwapNeeded = false;
			}
		}
		else
		{
			insertionIndex++;
			insertionSwapNeeded = image[insertionIndex].index < image[insertionIndex - 1].index;
			insertionSecondIndex = insertionIndex;
		}
			
		updateDisplayCanvas();
	}
		
	if(sorted)
	{
		clearInterval(sortInterval);
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

function pauseButton()
{
	if(paused)
	{
		paused = false;
		document.getElementById("pauseButton").value = "Pause";
	}
	else
	{
		paused = true;
		document.getElementById("pauseButton").value = "Resume";
	}
}